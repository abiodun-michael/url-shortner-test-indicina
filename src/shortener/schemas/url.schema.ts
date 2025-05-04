import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UrlDocument = HydratedDocument<Url>;


@Schema({ timestamps: true })
export class Url {
    @Prop({ required: true })
    url: string;

    @Prop({ index: true, required: true })
    aliasOrShortenedUrl: string;

    @Prop({ default: 0 })
    clicks: number;
}


export const UrlSchema = SchemaFactory.createForClass(Url);