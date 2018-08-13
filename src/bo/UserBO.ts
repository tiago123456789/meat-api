import UserDAO from "../dao/UserDAO";
import NotFoundException from "./../exception/NotFoundException";

export default class UserBO {

    private dao: UserDAO;
    private options = {
        password: 0
    }

    constructor() {
        this.dao = new UserDAO();
    }

    public async findAll() {
        return await this.dao.findAll(this.options);
    }

    public async findById(id: Number) {
        const user = await this.dao.findById(id, this.options);
        
        if (!user) {
            throw new NotFoundException("Registro não encontrado.")
        }

        return user;
    }

    public async remove(id: Number) {
        await this.findById(id);
        await this.dao.remove(id);
    }

    public async update(id: Number, documentModified) {
        await this.findById(id);
        await this.update(id, documentModified);
    }

    public async save(document) {
        await this.dao.save(document);
    }
}