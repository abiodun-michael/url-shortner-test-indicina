
import { Model, FilterQuery, UpdateQuery } from 'mongoose';

export abstract class BaseRepository<T> {
    constructor(protected readonly model: Model<T>) { }

    async create(doc: Partial<T>): Promise<T> {
        return this.model.create(doc);
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async findOne(filter: FilterQuery<T>): Promise<T | null> {
        return this.model.findOne(filter).exec();
    }

    async findAll(filter: FilterQuery<T> = {}): Promise<any[]> {
        const results = await this.model.find(filter).lean<T & { _id: any; }[]>().exec();
        return results.map((doc) => ({
            ...doc,
            id: doc._id.toString(),
        }));
    }

    async update(id: string, update: UpdateQuery<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.model.findByIdAndDelete(id).exec();
    }

    async count(filter: FilterQuery<T> = {}): Promise<number> {
        return this.model.countDocuments(filter).exec();
    }
}
