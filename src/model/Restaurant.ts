import * as mongoose from "mongoose";
import MenuSchema from "./Menu";

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Campo name é obrigatório"]
    },
    menu: {
        type: [MenuSchema],
        select: false,
        default: [],
    }
});

export const restaurant = mongoose.model("restaurant", restaurantSchema);