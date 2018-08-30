import * as restify from "restify";
import Route from "./Route";
import RestaurantEndpoint from "../endpoint/RestaurantEndpoint";
import validationIdMongodb from "./../middleware/ValidationIdMongodb";
import { pagination } from "./../middleware/Pagination";
import ReviewEndpoint from "../endpoint/ReviewEndpoint";

export default class ReviewRoute extends Route {

    private app: restify.Server;
    private endpoint: ReviewEndpoint;

    constructor(app) {
        super();
        this.app = app;
        this.endpoint = new ReviewEndpoint();
    }

    public loading() {
        this.app.get("/reviews", [pagination, this.endpoint.findAll]);
        this.app.get("/reviews/:id", [validationIdMongodb, this.endpoint.findById]);
        this.app.post("/reviews", this.endpoint.save);
    }
}