import * as restify from "restify";
import Route from "./Route";
import RestaurantEndpoint from "../endpoint/RestaurantEndpoint";

export default class RestaurantRoute extends Route {

    private app: restify.Server;
    private endpoint: RestaurantEndpoint;

    constructor(app) {
        super();
        this.app = app;
        this.endpoint = new RestaurantEndpoint();
    }

    public loading() {
        this.app.get("/restaurants", this.endpoint.findAll);
        this.app.get("/restaurants/:id", this.endpoint.findById);
        this.app.post("/restaurants", this.endpoint.save);
        this.app.put("/restaurants/:id", this.endpoint.update);
        this.app.del("/restaurants/:id", this.endpoint.delete);        
    }
}