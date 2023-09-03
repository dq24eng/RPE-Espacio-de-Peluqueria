import ProductManager from "./productManager.js"; 

const filePath = '../src/models/db/products-file.json'; 
const prodManager = new ProductManager(filePath); 

export class ProductsMemoryDAO{
    constructor () {} 

    async getProductsDAO () {
        try {
            const productos = await prodManager.getProducts();
            return productos;
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async getProductDAO (id) {
        try {
            const productos = await prodManager.getProducts();
            const producto = productos.find(p => p._id==id);
            if(!producto) return "Product not found";
            return producto;
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async createProductDAO(product){
        try {
            const newProduct = await prodManager.addProduct(product.title, product.description, product.price,
                product.thumbnail, product.code, product.stock, product.status, product.category); 
                // (title, description, price, thumbnail, code, stock, status=true, category)
            return newProduct;
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async updateProductDAO(id, product){
        try {
            const updProd = await prodManager.updateProduct(id, product);
            return updProd; 
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async deleteProductDAO(id){
        try {
            const delProd = await prodManager.deleteProduct(id);
            return delProd;
        } catch (error) {
            throw new Error (error.message);
        }
    }
}