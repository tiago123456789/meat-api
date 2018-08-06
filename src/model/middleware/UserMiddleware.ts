import Encriptador from "../../lib/Encriptador";

export default (schema) => {

    const encriptarSenha = (object, next) => {
        Encriptador.getHash(object.password)
            .then((hash) => {
                object.password = hash;
            })
            .then(() => next())
            .catch(next);
    };

    schema.pre("save", function (next) {
        const user = this;
        if (!user.isModified('password')) {
            next();
        } else {
            encriptarSenha(user, next);
        }
    });

    const updateMiddleware = function (next) {
        if (!this.getUpdate().password) {
            next();
        } else {
            encriptarSenha(this.getUpdate(), next);
        }
    };

    schema.pre("findOneAndUpdate", updateMiddleware);
    schema.pre("update", updateMiddleware);
}