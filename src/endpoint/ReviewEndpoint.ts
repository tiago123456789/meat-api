import ReviewBO from "../bo/ReviewBO";
import { AplicadorDeHateos } from "../lib/AplicadorDeHateos" 

export default class ReviewEndpoint {

    private bo: ReviewBO;

    constructor() {
        this.bo = new ReviewBO();
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.save = this.save.bind(this);
    }

    public async findAll(request, response, next) {
        try {
            const reviews = await this.bo.findAll();
            response.send(200, AplicadorDeHateos.aplicar(reviews, "revi"));
        } catch(e) {
            next(e);
        }
    }

    public async findById(request, response, next) {
        try {
            const id = request.params.id;
            const review = await this.bo.findById(id);
            response.send(200, review);
        } catch(e) {
            next(e);
        }
    }

    public async save(request, response, next) {
        try {
            const content = request.body;
            await this.bo.save(content);
            response.send(201);
        } catch(e) {
            next(e);
        }
    }
}