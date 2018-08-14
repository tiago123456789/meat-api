import DAO from "./DAO";
import { restaurant } from "../model/Restaurant";

export default class RestaurantDAO extends DAO {

    protected getEntidade() {
        return restaurant;
    }

    public async getPeopleByEmail(email) {
        return await this.getEntidade().findOne({ email });
    }
}