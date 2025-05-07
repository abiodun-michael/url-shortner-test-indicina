import { Controller, Get, Param, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { AppService } from "./app.service";
import { GetCookie, CookieData } from "./common/decorators/cookie.decorator";
import { CookieGuard } from "./common/guards/cookie.guard";

@UseGuards(CookieGuard)
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }


    @Get(":url_path")
    async redirect(@Param("url_path") urlPath: string, @Res() response: Response, @GetCookie() cookie: CookieData) {
        const destinationUrl = await this.appService.redirect(urlPath, cookie.deviceId);
        return response.redirect(destinationUrl);
    }
}
