import * as mongoose from "mongoose";

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
    }
});

export const User = mongoose.model("user", userSchema);