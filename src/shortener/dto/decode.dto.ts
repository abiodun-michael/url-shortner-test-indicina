import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUrl, Length } from "class-validator";


export class DecodeDTO {
    @ApiProperty()
    @IsString()
    @Length(6)
    @IsNotEmpty()
    urlPath: string;
}