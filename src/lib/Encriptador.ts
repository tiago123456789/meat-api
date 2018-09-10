import * as bcrypt from "bcrypt";

export default class Encriptador {

    static async getHash(value) {
        const saltRound = 10;
        return await bcrypt.hash(value, saltRound);
    }

    static async compareHashWithText(hash: string, text: string): any {
        return await bcrypt.compare(text, hash);
    }
}