import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { UrlRepository } from "./repository/url.repository";
import { IUrlShortener, OriginalUrl, ShortenedUrl } from "./interfaces/url-shortener.interface";
import { IStatisticsProvider } from "./interfaces/statistics.interface";
import { IQRCodeGenerator } from "./interfaces/qr-code.interface";
import { IUrlEncoder } from "./interfaces/url-encoder.interface";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class ShortenerService implements IUrlShortener {
    private readonly logger = new Logger(ShortenerService.name);

    constructor(
        private readonly urlRepository: UrlRepository,
        @Inject('IStatisticsProvider')
        private readonly statisticsProvider: IStatisticsProvider,
        @Inject('IQRCodeGenerator')
        private readonly qrCodeGenerator: IQRCodeGenerator,
        @Inject('IUrlEncoder')
        private readonly urlEncoder: IUrlEncoder
    ) {}

    async encode(url: string, alias?: string, deviceId?: string): Promise<ShortenedUrl> {
        try {
            let code = '';
            if (alias) {
                await this.checkAlias(alias);
                code = alias;
            } else {
                code = this.urlEncoder.encode(url);
            }

            await this.urlRepository.create({
                aliasOrCode: code,
                destinationUrl: url,
                ownerId: deviceId
            });

            return {
                message: "Url shortened successfully",
                status: true,
                data: {
                    url,
                    urlPath: code
                }
            };
        } catch (error) {
            this.logger.error(`Failed to encode URL: ${error.message}`, error.stack);
            throw error;
        }
    }

    async decode(urlPath: string, deviceId?: string): Promise<OriginalUrl> {
        try {
            const data = await this.urlRepository.findOne({ 
                aliasOrCode: urlPath, 
                ...(deviceId && { ownerId: deviceId }) 
            });

            if (!data) throw new NotFoundException("Url not found");

            return {
                message: "Url decoded successfully",
                status: true,
                data: {
                    ...data,
                    qrcode: await this.qrCodeGenerator.generateQRCode(data.destinationUrl)
                }
            };
        } catch (error) {
            this.logger.error(`Failed to decode URL: ${error.message}`, error.stack);
            throw error;
        }
    }

    async getAll(deviceId: string) {
        try {
            const allUrl = await this.urlRepository.findAll({ ownerId: deviceId });

            return {
                message: "All url fetched successfully",
                status: true,
                data: allUrl
            };
        } catch (error) {
            this.logger.error(`Failed to get all URLs: ${error.message}`, error.stack);
            throw error;
        }
    }

    private async checkAlias(alias: string) {
        try {
            const isAliasTaken = await this.urlRepository.findOne({
                alias
            });

            if (isAliasTaken) throw new BadRequestException("Alias is already taken");

            return true;
        } catch (error) {
            this.logger.error(`Failed to check alias: ${error.message}`, error.stack);
            throw error;
        }
    }

    async getStats(urlPath: string, deviceId: string) {
        try {
            await this.decode(urlPath, deviceId);
            const stats = await this.statisticsProvider.getStat(urlPath);
            return {
                message: "Stats fetched successfully",
                status: true,
                data: stats
            };
        } catch (error) {
            this.logger.error(`Failed to get stats: ${error.message}`, error.stack);
            throw error;
        }
    }

    @Cron(CronExpression.EVERY_30_MINUTES)
    private async updateStat() {
        try {
            const urls = await this.urlRepository.findAll();

            for (const url of urls) {
                const stats = await this.statisticsProvider.getStat(url.aliasOrCode);
                if (stats) {
                    await this.urlRepository.update(url.id, {
                        uniqueVisitors: stats.uniqueVisitorCount,
                        lastClickedAt: stats.lastVisitAt,
                        totalClicks: stats.visitCount
                    });
                }
            }
        } catch (error) {
            this.logger.error(`Failed to update stats: ${error.message}`, error.stack);
            throw error;
        }
    }
}