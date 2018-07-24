import { User } from "./../model/User";

export default (app) => {
    
    app.get("/users", (request, response, next) => {
        User.find({}).then((users) => response.send(200, users));
    });

    app.get("/users/:id", async (request, response, next) => {
        const id = request.params.id;
        const user = await User.findById(id);
        response.send(200, user);
    });

    app.post("/users", async (request, response, next) => {
        const newUser = request.body;
        console.log(newUser);
        const userSaved = await User.create(newUser);
        response.json(userSaved);
    });
}