import * as restify from "restify";
import Route from "./Route";
import RestaurantEndpoint from "../endpoint/RestaurantEndpoint";
import validationIdMongodb from "./../middleware/ValidationIdMongodb";
import { pagination } from "./../middleware/Pagination";

export default class RestaurantRoute extends Route {

    private app: restify.Server;
    private endpoint: RestaurantEndpoint;

    constructor(app) {
        super();
        this.app = app;
        this.endpoint = new RestaurantEndpoint();
    }

    public loading() {
        this.app.get("/restaurants", [ pagination, this.endpoint.findAll]);
        this.app.get("/restaurants/:id", [validationIdMongodb, this.endpoint.findById]);
        this.app.post("/restaurants", this.endpoint.save);
        this.app.put("/restaurants/:id", [validationIdMongodb, this.endpoint.update]);
        this.app.del("/restaurants/:id", [validationIdMongodb, this.endpoint.delete]);        
    }
}