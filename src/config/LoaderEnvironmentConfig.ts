import * as dotenv from "dotenv";
import Config from "./Config";

export default class LoaderEnvironmentConfig implements Config {

    public init() {
        const environment = process.env.NODE_ENV;
        const path = "./.env" + (environment == 'dev' ? '' : `-${environment}`);
        dotenv.config({ path: path });
    }

    
}