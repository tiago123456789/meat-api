import ReviewDAO from "../dao/ReviewDAO";
import NotFoundException from "./../exception/NotFoundException";

export default class ReviewBO {

    private dao: ReviewDAO;

    constructor() {
        this.dao = new ReviewDAO();
    }

    public async findAll(pagination) {
        return await this.dao.findAll({}, pagination);
    }

    public async findById(id) {
        const review = await this.dao.findById(id);
        
        if (review == null) {
            throw new NotFoundException("Not found register!");
        }

        return review;
    }

    public async save(content) {
        await this.dao.save(content);
    }
}