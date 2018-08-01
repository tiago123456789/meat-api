import * as restify from "restify";
import Config from "./Config";
import UserRoute from "../routes/UserRoute";
import Route from "../routes/Route"; 

export default class RouterConfig implements Config {

    private app: restify.Server;
    private routes: Route[];

    constructor(app) {
        this.app = app;
        this.routes = [
            new UserRoute(this.app)
        ];
    }

    public init(): void {
        this.routes.forEach(route => route.loading());
    }
}