import * as restify from "restify";
import * as corsMiddleware from "restify-cors-middleware";
import Config from "./Config";


export default class CorsConfig implements Config {

    private app = restify.Server;
    
    constructor(app) {
        this.app = app;
    };

    init(): void {
        const cors = corsMiddleware({
            preflightMaxAge: 60,
            origins: ["*"],
            allowHeaders: ["Authorization"]
        });

        this.app.pre(cors.preflight);
        this.app.use(cors.actual);
    }
}