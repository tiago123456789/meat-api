import DAO from "./DAO";
import { restaurant } from "../model/Restaurant";

export default class RestaurantDAO extends DAO {

    protected getEntidade() {
        return restaurant;
    }

    public async getRestaurantByName(name) {
        return await this.getEntidade().findOne({ name });
    }
}