import {Router} from "express";
import productController from '../controllers/product.controller.js';
import compression from "express-compression"; 

class productRouter {
    constructor() {
        this.startProduct = Router();
        this.startProduct.get("/", compression({ brotli: { enabled: true, zlib: {}}}), productController.getProducts); 
        this.startProduct.get("/:pid", productController.getProduct);
        this.startProduct.post("/", productController.createProduct); 
        this.startProduct.put("/:pid", productController.updateProduct); 
        this.startProduct.delete("/:pid", productController.deleteProduct); 
    }
    getRouter() {
        return this.startProduct;
    }
}

export default new productRouter(); 