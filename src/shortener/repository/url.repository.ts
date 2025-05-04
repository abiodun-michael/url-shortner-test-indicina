import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base.repository";
import { Url } from "../schemas/url.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";



@Injectable()
export class UrlRepository extends BaseRepository<Url> {
    constructor(@InjectModel(Url.name)
    private readonly urlModel: Model<Url>) {
        super(urlModel);
    }
}