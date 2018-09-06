import Token from "./Token";
import * as jwt from "jsonwebtoken";

export default class TokenBuilder {

    public static builder(token: Token) {
        return new Promise((resolve, reject) => {
            jwt.sign(
                token.getPayLoad(),
                token.getSecret(),
                { expiresIn: token.getTimeExpiredInSeconds()},
                (err, token) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(token);
                    }
                }
            );
        });
    }
}