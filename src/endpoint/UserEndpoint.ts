import * as restify from "restify";
import UserBO from "./../bo/UserBO";

export default class UserEndpoint {

    private _bo: UserBO;

    constructor() {
        this._bo = new UserBO();
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.save = this.save.bind(this);
        this.update = this.update.bind(this);
        this.updatePartial = this.updatePartial.bind(this);
        this.delete = this.delete.bind(this);
    }

    public async findAll(request: restify.Request, response: restify.Response, next) {
        try {
            const pagination = request["pagination"];
            const users = await this._bo.findAll(pagination);
            response.send({ users, paginacao: {
              quantidadeItensExibir: pagination.limit, paginaAtual: pagination.skip } 
            });
        } catch(e) {
            next(e);
        }
    }

    public async findById(request: restify.Request, response: restify.Response, next) {
        try {
            const id = request.params.id;
            const user = await this._bo.findById(id);
            response.send(user);
        } catch(e) {
            next(e);
        }
    }

    public async save(request: restify.Request, response: restify.Response, next) {
        try {
            const newUser = request.body;
            await this._bo.save(newUser);
            response.send(201);
        } catch (e) {
            next(e);
        }
    }

    public async update(request: restify.Request, response: restify.Response, next) {
        try {
            const id = request.params.id;
            const userModified = request.body;
            await this._bo.update(id, UserEndpoint, { runValidators: true });
            response.send(204);
        } catch (e) {
            next(e);
        }
    }

    public async updatePartial(request:  restify.Request, response: restify.Response, next) {
        try {
            const id = request.params.id;
            const userModified = request.body;
            await this._bo.update(id, userModified, { runValidators: true });
            response.send(204);
        } catch (e) {
            next(e);
        }
    }

    public async delete(request, response, next) {
        try {
            const id = request.params.id;
            await this._bo.remove(id);
            response.send(204);
        } catch (e) {
            next(e);
        }
    }
}