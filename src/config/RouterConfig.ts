import * as restify from "restify";
import Config from "./Config";
import UserRoute from "../routes/UserRoute";
import RestaurantRoute from "../routes/RestaurantRoute";
import Route from "../routes/Route";
import ReviewRoute from "../routes/ReviewRoute";
import AuthRoute from "../routes/AuthRoute";

export default class RouterConfig implements Config {

    private app: restify.Server;
    private routes: Route[];

    constructor(app) {
        this.app = app;
        this.routes = [
            new UserRoute(this.app),
            new RestaurantRoute(this.app),
            new ReviewRoute(this.app),
            new AuthRoute(this.app)
        ];
    }

    public init(): void {
        this.routes.forEach(route => route.loading());
    }
}