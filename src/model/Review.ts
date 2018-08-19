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
        ref: "restaurant"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

export default mongoose.model("review", reviewSchema);