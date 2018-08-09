import * as mongoose from "mongoose";
import NotFoundException from "./../exception/NotFoundException";

export default (request, response, next) => {
    const id = request.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("Trigger exception!!!!");
        return next(new NotFoundException("Registro não existe"));
    }
    next();
}