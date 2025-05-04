import { Module } from "@nestjs/common";
import { ShortenerService } from "./shortener.service";
import { UrlRepository } from "./repository/url.repository";
import { Mongoose } from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { Url, UrlSchema } from "./schemas/url.schema";



@Module({
    imports: [MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }])],
    providers: [ShortenerService, UrlRepository]
})
export class UrlShortenerModule { }