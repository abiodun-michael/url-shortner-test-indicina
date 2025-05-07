import { Injectable } from "@nestjs/common";
import { ShortenerService } from "./shortener/shortener.service";
import { RedisService } from "./redis/redis.service";



@Injectable()
export class AppService {
    constructor(private readonly shortenerService: ShortenerService, private readonly redisService: RedisService) { }


    async redirect(urlPath: string, deviceId: string) {
        try {

            let longUrl = await this.redisService.get(`path:${urlPath}`);

            if (!longUrl) {
                const urlData = await this.shortenerService.decode(urlPath);
                longUrl = urlData.data.destinationUrl;

            }

            await this.redisService.updateStat(urlPath, deviceId);
            return longUrl;
        } catch (error) {
            throw error;
        }
    }
}