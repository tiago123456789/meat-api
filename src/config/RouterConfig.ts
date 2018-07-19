import * as restify from "restify";
import Config from "./Config";
import userRoutes from "../routes/User"; 

export default class Router implements Config {

    private app: restify.Server;

    constructor(app) {
        this.app = app;
    }

    public init(): void {
        userRoutes(this.app);
    }
}