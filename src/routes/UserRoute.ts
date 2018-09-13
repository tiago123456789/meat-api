import * as restify from "restify";
import { User } from "./../model/User";
import Route from "./Route";
import validationIdMongoose from "./../middleware/ValidationIdMongodb";
import { pagination } from "./../middleware/Pagination";
import UserEndpoint from "../endpoint/UserEndpoint";
import AuthService from "../security/AuthService";

export default class UserRoute extends Route {

    private app: restify.Server;
    private endpoint: UserEndpoint;
    private authService: AuthService;

    constructor(app) {
        super();
        this.app = app;
        this.endpoint = new UserEndpoint();
        this.authService = new AuthService();
    }

    public loading() {
        this.app.get("/users", [pagination, this.endpoint.findAll]);
        this.app.get("/users/:id", [validationIdMongoose, this.endpoint.findById]);
        this.app.post("/users", [this.authService.hasAccess("ADMIN"), this.endpoint.save]);
        this.app.put("/users/:id", [this.authService.hasAccess("ADMIN"), this.endpoint.update]);
        this.app.patch("/users/:id", [this.authService.hasAccess("ADMIN"), validationIdMongoose, this.endpoint.updatePartial]);
        this.app.del(`/users/:id`, [this.authService.hasAccess("ADMIN"), validationIdMongoose, this.endpoint.delete])
    }
}