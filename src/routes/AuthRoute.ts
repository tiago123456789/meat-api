import * as restify from "restify";
import Route from "./Route";
import AuthEndpoint from "../endpoint/AuthEndpoint";

export default class AuthRoute extends Route {
    
    private app: restify.Server;
    private authEndpoint: AuthEndpoint;

    constructor(app) {
        super();
        this.app = app;
        this.authEndpoint = new AuthEndpoint();
    }

    public loading() {
        this.app.post("/auth", this.authEndpoint.authenticate)
    }
}