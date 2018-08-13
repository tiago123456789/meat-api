import * as restify from "restify";
import { User } from "./../model/User";
import Route from "./Route";
import validationIdMongoose from "./../middleware/ValidationIdMongodb";
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
        this.app.get("/users", this.endpoint.findAll);
        this.app.get("/users/:id", [validationIdMongoose, this.endpoint.findById]);

        this.app.post("/users", async (request, response, next) => {
            try {
                const newUser = new User(request.body);
                await newUser.save();
                response.send(201);
            } catch (e) {
                next(e);
            }
        });

        this.app.put("/users/:id", async (request, response, next) => {
            try {
                const id = request.params.id;
                const userModified = request.body;
                await User.update({ _id: id }, { $set: userModified }, { runValidators: true }).exec();
                response.send(204);
            } catch (e) {
                next(e);
            }
        });

        this.app.patch("/users/:id", async (request, response, next) => {
            try {
                const id = request.params.id;
                const userModified = request.body;
                await User.findByIdAndUpdate({ _id: id }, { $set: userModified }, { runValidators: true });
                response.send(204);
            } catch (e) {
                next(e);
            }
        });

        this.app.del(`/${this.endpoint}/:id`, [validationIdMongoose, async (request, response, next) => {
            try {
                const id = request.params.id;
                await User.remove({ _id: id });
                response.send(204);
            } catch (e) {
                next(e);
            }
        }])
    }
}