export default class Route {

    private path: String;
    private methodHttp: String;
    private callback: any;

    constructor(path: String, methodHttp: String, callback: any) {
        this.path = path;
        this.methodHttp = methodHttp;
        this.callback = callback;
    }

    public getPath(): String {
        return this.path;
    }

    public getMethodHttp(): String {
        return this.methodHttp;
    }

    public getCallback(): String {
        return this.callback;
    }
}