import * as mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Campo name obrigatório"]
    },
    price: {
        type: Number,
        default: 0.00
    }
});

export default menuSchema;