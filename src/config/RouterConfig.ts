import * as restify from "restify";
import Config from "./Config";

export default class Router implements Config {

    private app: restify.Server;

    constructor(app) {
        this.app = app;
    }

    public init(): void {
        this.app.get("/users", (request, response, next) => {
            response.send(200, { "username": "Tiago R. da costa", "email": "tiagor@gmail.com" });
        });

        this.app.get("/users/:id", (request, response, next) => {
            const id = request.params.id;
            response.send(200, { id, "username": "Tiago R. da costa", "email": "tiagor@gmail.com" });
        });
    }
}