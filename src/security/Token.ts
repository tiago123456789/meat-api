export default class Token {

    private encodingSecret;
    private payLoad;
    private secret; 
    private timeExpiredInSeconds;

    constructor() {
        this.payLoad = {};
        this.secret = process.env.TOKEN_SECRET;
        this.secret = process.env.TOKEN_TIME_EXPIRED_IN_SECONDS;
        this.encodingSecret = "base64";
    }

    public adicionar(key, value): Token {
        this.payLoad[key] = value;
        return this;
    }

    public getPayLoad() {
        return this.payLoad;
    }

    public getSecret() {
        return Buffer.from(this.secret).toString(this.encodingSecret);
    }

    public getTimeExpiredInSeconds() {
        return this.timeExpiredInSeconds;
    }

}