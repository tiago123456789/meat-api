import * as restify from "restify";
import Config from "./Config";
import Router from "./RouterConfig";
import DatabaseConfig from "./DatabaseConfig";
import mergePathParse from "./../middleware/MergePatchParse";
import ErrorHandler from "./../middleware/ErrorHandler";
import LoaderEnvironmentConfig from "./LoaderEnvironmentConfig";
import CorsConfig from "./CorsConfig";

export default class Server implements Config {

    private app: restify.Server;
    private configurations: Config[] = [];
    
    constructor() {
        this.app = restify.createServer({
            name: "Meat api",
            version: "1.0.0"
        });
        this.configurations.push(new Router(this.app));
        this.configurations.push(new DatabaseConfig());
        this.configurations.push(new LoaderEnvironmentConfig());   
        this.configurations.push(new CorsConfig(this.app));     
    }

    init(): void {
        this.applyPlugins();
        this.initConfigApp();
        this.app.listen(3000, (error) => console.log("Server running http://localhost:3000."));
        this.initEvents();
    }

    private initEvents() {
        this.app.on("restifyError", ErrorHandler);
    }

    private applyPlugins(): void {
        this.app.use(restify.plugins.queryParser());
        this.app.use(restify.plugins.bodyParser());
        this.app.use(mergePathParse);
    }

    private initConfigApp(): void {
        this.configurations.forEach(config => config.init()); 
    }
}