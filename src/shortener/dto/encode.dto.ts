import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";


export class EncodeDTO {
    @ApiProperty()
    @IsUrl()
    @IsNotEmpty()
    url: string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    alias?: string;
}