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
        const newUser = new User(request.body);
        await newUser.save();
        response.send(201);
    });
}