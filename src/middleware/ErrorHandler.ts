import * as restify from "restify";

export default (request: restify.Request, response: restify.Response, error, done) => {

    error.toJSON = () => {
        return {
            message: error.message  
        }
    };

    switch(error.name) {
        case "MongoError":
            if (error.code === "11000") {
                error.status = 400;
            }
            break;
        case "ValidationError":
            error.status = 400;
            break;
    }

    done();
}