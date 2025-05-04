import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CookieGuard } from "src/common/guards/cookie.guard";


@UseGuards(CookieGuard)
@Controller("urls")
export class ShortenerController {
    constructor() { }



    @Post("encode")
    encode(@Body() payload: any) {

    }

    @Post("decode")
    decode(@Body() payload: any) {

    }



    @Get("statistics/:url_path")
    stats(@Param("url_path") urlPath: string) {

    }



    @Get()
    list(@Body() payload: any) {

    }


    @Get(":url_path")
    redirect(@Param("url_path") urlPath: string) {

    }

}