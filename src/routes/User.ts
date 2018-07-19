import { User } from "./../model/User";

export default (app) => {
    
    app.get("/users", async (request, response, next) => {
        const users = await User.find({});
        response.send(200, users);
    });

    app.get("/users/:id", async (request, response, next) => {
        const id = request.params.id;
        const user = await User.findById(id);
        response.send(200, user);
    });
}