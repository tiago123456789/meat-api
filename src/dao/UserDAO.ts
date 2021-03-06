import DAO from "./DAO";
import { User } from "../model/User";

export default class UserDAO extends DAO {

    protected getEntidade() {
        return User;
    }

    public async getPeopleByEmail(email) {
        return await this.getEntidade().findOne({ email }, { name: 1, email: 1, password: 1 });
    }
}