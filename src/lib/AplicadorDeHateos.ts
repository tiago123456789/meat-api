export class AplicadorDeHateos {

    public static aplicar(document: Array<any>, addressEndpoint: string): any {
        let resources = document;
        
        if (document.length == 1) {
            return AplicadorDeHateos.adicionarLinks(document, addressEndpoint);
        }

        return resources.map(resource => {
            return AplicadorDeHateos.adicionarLinks(resource, addressEndpoint);
        });
    }

    private static adicionarLinks(resource: any, addressEndpoint: string): any {
        const objectReturned = { ...resource,  _links: { self: `/${addressEndpoint}/${resource._id}` } };

        if ("restaurants" == addressEndpoint) {
            objectReturned._links.menu = `/${addressEndpoint}/${resource._id}/menu`
        }

        if ("reviews" == addressEndpoint) {
            objectReturned._links.restaurents = `/restaurants/${resource.restaurant}`;
            objectReturned._links.user = `/users/${resource.user}`;
        }

        return objectReturned
    }
}