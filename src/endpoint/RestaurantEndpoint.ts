import RestaurantBO from "../bo/RestaurantBO";

export default class RestaurantEndpoint {

    private bo: RestaurantBO;

    constructor() {
        this.bo = new RestaurantBO();
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.save = this.save.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    public async findAll(request, response, next) {
        try {
            const pagination = request["pagination"];
            const restaurants = await this.bo.findAll(pagination);
            response.send(200, restaurants);
        } catch(e) {
            next(e);
        }
    }

    public async findById(request, response, next) {
        try {
            const id = request.params.id;
            const restaurant = await this.bo.findById(id);
            response.send(200, restaurant);
        } catch(e) {
            next(e);
        }
    }

    public async save(request, response, next) {
        try {
            const newRestaurant = request.body;
            await this.bo.save(newRestaurant);
            response.send(201);
        } catch(e) {
            next(e);
        }
    }

    public async delete(request, response, next) {
        try {
            const id = request.params.id;
            await this.bo.delete(id);
            response.send(204);
        } catch(e) {
            next(e);
        }
    }

    public async update(request, response, next) {
        try {
            const id = request.params.id;
            const restaurantModified = request.body;
            await this.bo.update(id, restaurantModified);
            response.send(204);
        } catch(e) {
            next(e);
        }
    }
}