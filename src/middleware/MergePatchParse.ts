import * as restify from "restify";

export default (request: restify.Request, response: restify.Response, next) => {
    const CONTENT_TYPE_MERGE_PATCH_JSON = "application/merge-pathc+json";
    const METODO_REQUESICAO = "PATCH";

    try {
        if (request.getContentType() === CONTENT_TYPE_MERGE_PATCH_JSON && request.method == METODO_REQUESICAO) {
            request.body = JSON.parse(request.body);
        }

        next();
    } catch (e) {
        next(e);
    }
}