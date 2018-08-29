import * as restify from "restify";
import { User } from "./../model/User";
import Route from "./Route";
import validationIdMongoose from "./../middleware/ValidationIdMongodb";
import { pagination } from "./../middleware/Pagination";
import UserEndpoint from "../endpoint/UserEndpoint";

export default class UserRoute extends Route {

    private app: restify.Server;
    private endpoint: UserEndpoint;

    constructor(app) {
        super();
        this.app = app;
        this.endpoint = new UserEndpoint();
    }

    public loading() {
        this.app.get("/users", pagination, this.endpoint.findAll);
        this.app.get("/users/:id", [validationIdMongoose, this.endpoint.findById]);
        this.app.post("/users", this.endpoint.save);
        this.app.put("/users/:id", this.endpoint.update);
        this.app.patch("/users/:id", [validationIdMongoose, this.endpoint.updatePartial]);
        this.app.del(`/users/:id`, [validationIdMongoose, this.endpoint.delete])
    }
}