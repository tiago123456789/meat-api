import * as  mongoose from "mongoose";
import Config from "./Config";

export default class DatabaseConfig implements Config {

    constructor() {}

    public init(): void {
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect("mongodb://localhost:27017/meat-api", {
            useMongoClient: true
        });
    }

}