import UserBO from "../bo/UserBO";
import NotFoundException from "../exception/NotFoundException";
import Encriptador from "../lib/Encriptador";
import BusinessException from "../exception/BusinessException";
import Token from "./Token";
import TokenBuilder from "./TokenBuilder";
import { access } from "fs";

class AuthService {

    private userBO: UserBO

    constructor() {
        this.userBO = new UserBO();
    }

    public async authenticate(email: string, password: string) {
        const MESSAGE_ERRO = "Data invalids!";
        const people = await this.userBO.findByEmail(email);

        if (!people) {
            throw new NotFoundException(MESSAGE_ERRO)
        }

        const isValidPassword = await Encriptador.compareHashWithText(people.password, password);

        if (!isValidPassword) {
            throw new NotFoundException(MESSAGE_ERRO);
        }

        const accessToken = await this.getAccessToken(people);
        return {
            id: people.id, name: people.name, accessToken
        }
    }

    private async getAccessToken(data): string {
        Token token = new Token();
        token.adicionar("email", data.email);

        const token = await TokenBuilder.builder(token);
        return token;
    }
}