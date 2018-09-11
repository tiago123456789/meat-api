import * as restify from "restify";
import UserBO from "../bo/UserBO";
import Encriptador from "../lib/Encriptador";
import Token from "./Token";
import TokenBuilder from "./TokenBuilder";
import NotFoundException from "../exception/NotFoundException";
import BusinessException from "../exception/BusinessException";
import { CONSTANTES } from "../config/Constantes";
import TokenService from "./TokenService";
import SecurityException from "../exception/SecurityException";

class AuthService {

    private userBO: UserBO
    private tokenService: TokenService;

    constructor() {
        this.userBO = new UserBO();
        this.tokenService = new TokenService();
    }

    public hasAccess(permissionAccess) {
        return (request, response, next) => {
            try {
                const token = this.tokenService.getAccessTokenWithoutPrefix(request);
                this.tokenService.isValid(token);
                const conteudoToken = this.tokenService.getPayload(token);
                const hasPermission = conteudoToken.permissions.includes(permissionAccess);
                if (!hasPermission) {
                    throw new SecurityException("You don't authorization access to the resource.");
                }
                next();
            } catch(e) {
                next(e);
            }

        }
    }

    public async authenticate(email: string, password: string) {
        const MESSAGE_ERRO = "Data invalids!";
        const people = await this.userBO.findByEmail(email);

        if (!people) {
            throw new SecurityException(MESSAGE_ERRO, 401);
        }

        const isValidPassword = await Encriptador.compareHashWithText(people.password, password);

        if (!isValidPassword) {
            throw new SecurityException(MESSAGE_ERRO, 401);
        }

        const accessToken = await this.getAccessToken(people);
        return {
            id: people.id, name: people.name, accessToken
        }
    }

    private async getAccessToken(data): string {
        Token token = new Token();
        token
            .adicionar("email", data.email)
            .adicionar("permissions", data.profiles);
        const token = await TokenBuilder.builder(token);
        return token;
    }
}