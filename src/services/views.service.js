import productModel from "../models/dao/mongo/model/products.model.js"

class viewsService {

    // List of products View
    async getProducts(page, limit, query, sort){
        try {
            // Variables sin filtrar que se reciben del método get
            const {docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages} = 
                await productModel.paginate({}, {limit, page, lean: true});
            const products = docs;
            const pages = {hasPrevPage, hasNextPage, nextPage, prevPage, totalPages}
            // Variable filtrada por categoría que se puede recibir del método get
            const prodFiltrados = await productModel.paginate({category: query}, {limit, page, lean: true})
            // Ordenación sort 
            if(sort == 'asc') {
                prodFiltrados.docs.sort(((a,b) => a.price - b.price));  // Ordenamiento de menor a mayor por precio
                products.sort(((a,b) => a.price - b.price));
            } else if (sort == 'desc') {
                prodFiltrados.docs.sort(((a,b) => b.price - a.price));  // Ordenamiento de mayor a menor por precio
                products.sort(((a,b) => b.price - a.price));
            }
            return prodFiltrados.docs.length > 0 ? {prodFiltrados, pages} : {products, pages}
        } catch (error) {
            throw new Error (error.message);
        }
    }

    // Product View
    async getProduct(id) {
        try {
            return productModel.find({_id: id}).lean();
        } catch (error) {
            throw new Error (error.message);
        }
    }
}

export default new viewsService(); 