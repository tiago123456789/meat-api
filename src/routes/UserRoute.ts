import * as restify from "restify";
import { User } from "./../model/User";
import Route from "./Route";

export default class UserRoute extends Route {

    private app: restify.Server;
    private endpoint = "users";

    constructor(app) {
        super();
        this.app = app;
    }

    public loading() {
        this.app.get("/users", (request, response, next) => {
            User.find({}).then((users) => response.send(200, users));
        });
    
        this.app.get("/users/:id", async (request, response, next) => {
            const id = request.params.id;
            const user = await User.findById(id);
            response.send(200, user);
        });
    
        this.app.post("/users", async (request, response, next) => {
            const newUser = new User(request.body);
            await newUser.save();
            response.send(201);
        });
    
        this.app.put("/users/:id", async (request, response, next) => {
            const id = request.params.id;
            const userModified = request.body;
            await User.update({ _id: id }, { $set: userModified }).exec();
            response.send(204);
        });
    
        this.app.patch("/users/:id", async (request, response, next) => {
            const id = request.params.id;
            const userModified = request.body;
            await User.findByIdAndUpdate({ _id: id }, { $set: userModified });
            response.send(204);
        });

        this.app.del(`/${this.endpoint}/:id`, async (request, response, next) => {
            const id = request.params.id;
            await User.remove({ _id: id });
            response.send(204);
        })
    }
}