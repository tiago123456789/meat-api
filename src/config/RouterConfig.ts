import * as restify from "restify";
import Config from "./Config";
import Route from "../common/Route";

export default class Router implements Config {

    private app: restify.Server;

    constructor(app) {
        this.app = app;
    }

    public init(): void {
        const userRouter: Route = new Route("/users", "get", (request, response, next) => {
            response.send(200, { "username": "Tiago R. da costa", "email": "tiagor@gmail.com" });
        });
        
        this.app[userRouter.getMethodHttp().toString()](userRouter.getPath(), userRouter.getCallback());
    }
}