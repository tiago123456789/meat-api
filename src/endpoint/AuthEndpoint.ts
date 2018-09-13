import AuthService from "../security/AuthService";

export default class AuthEndpoint {

    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
        this.authenticate = this.authenticate.bind(this);
    }

    async authenticate(request, response, next) {
        try {
            const { email, password } = request.body;
            const informationsUserAuthenticated = await this.authService.authenticate(email, password);
            response.send(informationsUserAuthenticated);
        } catch(e) {
            next(e);
        }
    }
}