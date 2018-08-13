import DAO from "./DAO";
import { User } from "../model/User";

export default class UserDAO extends DAO {

    protected getEntidade() {
        return User;
    }
}