import * as mongoose from "mongoose";
import { validateCPF } from "./../lib/CustomValidator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Campo name é obrigatório."],
        maxlength: [80, "Campo name deve possui no máximo 80 caracteres."],
        minlength: [3, "Campo name deve possui no máximo 3 caracteres."]        
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Campo email é obrigatório"],
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Campo email está inválido!"
        ]
    },
    password: {
        type: String,
        select: true,
        required: true,
        maxlength: [11, "Campo name deve possui no máximo 11 caracteres."],
        minlength: [6, "Campo name deve possui no máximo 6 caracteres."]        
    },
    gender: {
        type: String,
        required: [true, "Campo gender é obrigatório."],
        enum: ["Male", "Female"]
    },
    cpf: {
        type: String,
        required: true,
        validate: {
            validator: validateCPF,
            message: "{PATH}: cpf com valor ({VALUE}) é inválido."
        }
    }
});

export const User = mongoose.model("user", userSchema);