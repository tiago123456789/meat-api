import * as restify from "restify";

const server = restify.createServer({
    name: "Meat api",
    version: "1.0.0"
});

server.use(restify.plugins.queryParser());

server.get("/info", (request, response, next) => {
    response.json({ 
        method: request.method,
        path: request.path(),
        userAgent: request.userAgent(),
        querystring: request.query
    });
    return next();
});

server.listen(3000, () => console.log(" Server running in http://localhost:3000"));