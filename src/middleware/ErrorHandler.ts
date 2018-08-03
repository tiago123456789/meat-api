import * as restify from "restify";

export default (request: restify.Request, response: restify.Response, error, done) => {

   
    switch(error.name) {
        case "MongoError":
            if (error.code === "11000") {
                error.status = 400;
            }
            break;
        case "ValidationError":
            error.status = 400;
            error.message = [];
            for (let prop in error.errors) {
                error.message.push(error.errors[prop].message);
            }
            break;
    }

    error.toJSON = () => {
        return {
            message: error.message  
        }
    };

    done();
}