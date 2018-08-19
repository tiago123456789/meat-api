import * as mongoose from "mongoose";

export default abstract class DAO {

    public async findAll(options = {}) {
        return await this.getEntidade().find({}, options);
    }

    public async findById(id: Number, options = {}) {
        return await this.getEntidade().findById(id, options);
    }

    public async update(id: Number, document: any, options: any) {
        await this.getEntidade().findByIdAndUpdate(id, { $set: document }, options);
    }

    public async remove(id: Number) {
        await this.getEntidade().deleteOne({ _id: id });
    }

    public async save(newDocument: any) {
        await this.getEntidade().create(newDocument);
    }

    protected abstract getEntidade();
}