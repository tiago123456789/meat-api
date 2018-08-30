import DAO from "./DAO";
import review from "./../model/Review";


export default class ReviewDAO extends DAO {

    public getEntidade() {
        return review;
    }

    public async findAll(options = {}, pagination) {
        return await this.getEntidade()
                        .find({}, options)
                        .limit(pagination.limit)
                        .skip(pagination.skip)
                        .populate("restaurant", "name")
                        .populate("user", "name");
    } 
}