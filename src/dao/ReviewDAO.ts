import DAO from "./DAO";
import review from "./../model/Review";


export default class ReviewDAO extends DAO {

    public getEntidade() {
        return review;
    }

    public async findAll(options = {}) {
        return await this.getEntidade()
                        .find({}, options)
                        .populate("restaurant", "name")
                        .populate("user", "name");
    } 
}