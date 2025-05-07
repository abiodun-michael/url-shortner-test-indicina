import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UrlDocument = HydratedDocument<Url>;


@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Url {
    @Prop({ required: true })
    destinationUrl: string;

    @Prop({ index: true })
    aliasOrCode: string;

    @Prop({ default: 0 })
    totalClicks: number;

    @Prop({ default: 0 })
    uniqueVisitors: number;

    @Prop({ required: false })
    lastClickedAt: Date;

    @Prop({ index: true })
    ownerId: string;
}


const UrlSchema = SchemaFactory.createForClass(Url);

UrlSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

export { UrlSchema };