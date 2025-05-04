import { BadRequestException, Injectable } from "@nestjs/common";
import { UrlRepository } from "./repository/url.repository";



@Injectable()
export class ShortenerService {
    constructor(private readonly urlRepository: UrlRepository) { }


    async encode(url: string, alias?: string, deviceId?: string) {
        try {
            if (alias) {
                await this.checkAlias(alias);
            }
        } catch (error) {
            throw error;
        }
    }

    async decode(aliasOrShortUrl: string, deviceId: string) { }

    async stats(aliasOrShortUrl: string, deviceId: string) { }

    async getAll(deviceId: string) { }


    async checkAlias(alias: string) {
        try {
            const isAliasTaken = await this.urlRepository.findOne({
                aliasOrShortenedUrl: alias
            });

            if (isAliasTaken) throw new BadRequestException("Alias is already taken");

            return true;
        } catch (error) {
            throw error;
        }
    }
}