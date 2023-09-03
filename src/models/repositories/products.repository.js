class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getProducts() {
        return await this.dao.getProductsDAO();
    }

    async getProduct(id){
        return await this.dao.getProductDAO(id); 
    }

    async createProduct(data) {
        return await this.dao.createProductDAO(data);
    }

    async updateProduct(id, data) {
        return await this.dao.updateProductDAO(id, data);
    }

    async deleteProduct(id) {
        return await this.dao.deleteProductDAO(id);
    }
}

export default ProductsRepository;