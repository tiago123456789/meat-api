import RestaurantBO from "../bo/RestaurantBO";

export default class RestaurantEndpoint {

    private bo: RestaurantBO;

    constructor() {
        this.bo = new RestaurantBO();
    }

    public async findAll(request, response, next) {
        try {
            const restaurants = await this.bo.findAll();
            response.status(200).json(restaurants);
        } catch(e) {
            next(e);
        }
    }

    public async findById(request, response, next) {
        try {
            const id = request.params.id;
            const restaurant = await this.bo.findById(id);
            response.status(200).json(restaurant);
        } catch(e) {
            next(e);
        }
    }
}