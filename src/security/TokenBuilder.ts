import Token from "./Token";
import * as jwt from "jsonwebtoken";

export default class TokenBuilder {

    public static builder(token: Token) {
        return new Promise((resolve, reject) => {
            jwt.sign(
                { 
                    ...token.getPayLoad(), 
                    exp: parseInt(token.getTimeExpiredInSeconds())
                },
                token.getSecret(),
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