import UserBO from "./../bo/UserBO";
import * as restify from "restify";

export default class UserEndpoint {

    private bo: UserBO;

    constructor() {
        this.bo = new UserBO();
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
    }

    public async findAll(request: restify.Request, response: restify.Response, next) {
        try {
            const users = await this.bo.findAll();
            response.send(users);
        } catch(e) {
            next(e);
        }
    }

    public async findById(request: restify.Request, response: restify.Response, next) {
        try {
            const id = request.params.id;
            const user = await this.bo.findById(id);
            response.send(user);
        } catch(e) {
            next(e);
        }
    }
}