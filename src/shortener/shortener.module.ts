import { Module } from "@nestjs/common";
import { ShortenerController } from "./shortener.controller";
import { ShortenerService } from "./shortener.service";
import { UrlRepository } from "./repository/url.repository";
import { RedisModule } from "../redis/redis.module";
import { RedisStatisticsProvider } from "./services/redis-statistics.service";
import { QRCodeGeneratorService } from "./services/qr-code-generator.service";
import { NanoidEncoder } from "./services/nanoid-encoder.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Url, UrlSchema } from "./schemas/url.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]), RedisModule],
    controllers: [ShortenerController],
    providers: [
        ShortenerService,
        UrlRepository,
        {
            provide: 'IStatisticsProvider',
            useClass: RedisStatisticsProvider
        },
        {
            provide: 'IQRCodeGenerator',
            useClass: QRCodeGeneratorService
        },
        {
            provide: 'IUrlEncoder',
            useClass: NanoidEncoder
        }
    ],
    exports: [ShortenerService]
})
export class ShortenerModule { }