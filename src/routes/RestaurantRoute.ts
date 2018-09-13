import * as restify from "restify";
import Route from "./Route";
import RestaurantEndpoint from "../endpoint/RestaurantEndpoint";
import validationIdMongodb from "./../middleware/ValidationIdMongodb";
import { pagination } from "./../middleware/Pagination";
import AuthService from "../security/AuthService";

export default class RestaurantRoute extends Route {

    private app: restify.Server;
    private endpoint: RestaurantEndpoint;
    private authService: AuthService;

    constructor(app) {
        super();
        this.app = app;
        this.endpoint = new RestaurantEndpoint();
        this.authService = new AuthService();
    }

    public loading() {
        this.app.get("/restaurants", [ pagination, this.endpoint.findAll]);
        this.app.get("/restaurants/:id", [validationIdMongodb, this.endpoint.findById]);
        this.app.post("/restaurants", [this.authService.hasAccess("ADMIN"), this.endpoint.save]);
        this.app.put("/restaurants/:id", [this.authService.hasAccess("ADMIN"), validationIdMongodb, this.endpoint.update]);
        this.app.del("/restaurants/:id", [this.authService.hasAccess("ADMIN"), validationIdMongodb, this.endpoint.delete]);        
    }
}