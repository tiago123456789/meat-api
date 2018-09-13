import * as restify from "restify";
import * as jwt from "jsonwebtoken";
import Token from "./Token";
import SecurityException from "./../exception/SecurityException";

import { CONSTANTES } from "../config/Constantes";

export default class TokenService {

    private token: Token;

    constructor() {
        this.token = new Token();
    }

    public getPayload(token: string) {
        return jwt.decode(token);
    }

    public isValid(token: string) {
        try {
            jwt.verify(token, this.token.getSecret());
            return true;
        } catch(e) {
            throw new SecurityException(e.message);
        }
    }

    public getAccessTokenWithoutPrefix(request: restify.Request): string {
        let token = request.header(CONSTANTES.PARAM_AUTH);
        token = (token || "").replace(CONSTANTES.PARAM_PREFIX_TOKEN, "");
        return token;
    }
}