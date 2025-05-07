import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CookieGuard } from "src/common/guards/cookie.guard";
import { EncodeDTO } from "./dto/encode.dto";
import { DecodeDTO } from "./dto/decode.dto";
import { config } from "src/config";
import { ShortenerService } from "./shortener.service";
import { CookieData, GetCookie } from "src/common/decorators/cookie.decorator";


@UseGuards(CookieGuard)
@Controller("api")
export class ShortenerController {
    constructor(private readonly shortenerService: ShortenerService) { }


    @Get("domains")
    getDomains() {
        return config.availableDomains;
    }


    @Post("encode")
    encode(@Body() payload: EncodeDTO, @GetCookie() cookie: CookieData) {
        return this.shortenerService.encode(payload.url, payload.alias, cookie.deviceId);
    }


    @Post("decode")
    decode(@Body() payload: DecodeDTO, @GetCookie() cookie: CookieData) {
        return this.shortenerService.decode(payload.urlPath, cookie.deviceId);
    }


    @Get("statistics/:url_path")
    stats(@Param("url_path") urlPath: string, @GetCookie() cookie: CookieData) {
        return this.shortenerService.getStats(urlPath, cookie.deviceId);
    }

    @Get("list")
    list(@GetCookie() cookie: CookieData) {
        return this.shortenerService.getAll(cookie.deviceId);
    }
}