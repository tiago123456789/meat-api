import DAO from "./DAO";
import review from "./../model/Review";


export default class ReviewDAO extends DAO {

    public getEntidade() {
        return review;
    }
}