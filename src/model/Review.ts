import * as mongoose from "mongoose";
import { ObjectId } from "bson";

const reviewSchema = new mongoose.Schema({
    note: {
        type: Number,
        max: [5, "Campo {PATH} pode ter no máximo {MAX}."],
        default: 0
    },
    comment: String,
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant",
        required: [true, "Campo {PATH} é obrigatório."]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Campo {PATH} é obrigatório!"]
    }
});

export default mongoose.model("review", reviewSchema);