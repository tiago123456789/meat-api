import UserDAO from "../dao/UserDAO";
import NotFoundException from "./../exception/NotFoundException";
import BusinessException from "./../exception/BusinessException";


export default class UserBO {

    private dao: UserDAO;
    private options = {
        password: 0
    }

    constructor() {
        this.dao = new UserDAO();
    }

    public async findAll(pagination: any) {
        return await this.dao.findAll(pagination, this.options);
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

    public async update(id: Number, documentModified, options) {
        await this.findById(id);
        await this.dao.update(id, documentModified, options);
    }

    public async save(document) {
        const emailAlreadyUsed = await this.verifyEmailUsed(document.email);
        
        if (emailAlreadyUsed) {
            throw new BusinessException("Email already used.");
        }

        await this.dao.save(document);
    }

    public async findByEmail(email: string) {
        return await this.dao.getPeopleByEmail(email);
    }

    private async verifyEmailUsed(email: String) {
        const peopleReturned = await this.dao.getPeopleByEmail(email);
        return peopleReturned != null;
    }
}