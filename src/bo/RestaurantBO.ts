import RestaurantDAO from "../dao/RestaurantDAO";
import NotFoundException from "../exception/NotFoundException";
import BusinessException from "../exception/BusinessException";


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

    public async save(newRestaurant) {
        const nameRestauranteAlreadyUsing = await this.verifyIfNameAlreadyUsing(newRestaurant.name);

        if (nameRestauranteAlreadyUsing) {
            throw new BusinessException("Exists restaurant using name!");
        }

        await this.dao.save(newRestaurant);
    }

    public async delete(id) {
        await this.findById(id);
        await this.dao.remove(id);
    }

    public async update(id, contentModified) {
        await this.findById(id);
        await this.dao.update(id, contentModified, { runValidations: true });
    }

    private async verifyIfNameAlreadyUsing(name) {
        const restaurant = await this.dao.getRestaurantByName(name);
        return restaurant != null;
    }
}