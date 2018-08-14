import RestaurantDAO from "../dao/RestaurantDAO";
import NotFoundException from "../exception/NotFoundException";

export default class RestaurantBO {

    private dao: RestaurantDAO;

    constructor() {
        this.dao = new RestaurantDAO();
    }

    public async findAll() {
        return await this.dao.findAll();
    }

    public async findById(id) {
        const restaurant = await this.dao.findById(id);

        if (!restaurant) {
            throw new NotFoundException("Registro não encontrado");
        }

        return restaurant;
    }
}