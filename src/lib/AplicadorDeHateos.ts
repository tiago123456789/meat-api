export class AplicadorDeHateos {

    public static aplicar(document: Array<any>, addressEndpoint: string): any {
        let resources = document;
        return resources.map(resource => {
            return { ...resource._doc, _links: { self: `http://localhost:3000/${addressEndpoint}/${resource._id}` } };
        });
    }
}