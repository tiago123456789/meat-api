import * as restify from "restify";

export const pagination = (request: restify.Request, response: restify.Response, next) => {
    let { limit, skip } = request.query;

    if (limit && skip) {
        skip = (skip - 1) * parseInt(limit);
    }

    if (!limit) {
        limit = 10
    } 

    if (!skip) {
        skip = 0;
    }

    request["pagination"] = { limit: parseInt(limit), skip };
    next();
}