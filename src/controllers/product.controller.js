import productService from '../services/product.service.js'

class productController {
    async getProducts(req, res) {
        try {
            const response = await productService.getProducts(); 
            res.status(201).json({products: response, status: "success"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
    async getProduct(req, res) {
        try {
            const response = await productService.getProduct(req.params.pid); 
            res.status(201).json({products: response, status: "success"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
    async createProduct(req, res) {
        try {
            const data = req.body; 
            const response = await productService.createProduct(data);
            res.status(201).json({product: response, status: "success"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
    async updateProduct(req, res) {
        try {
            const data = req.body; 
            const id = req.params.pid;
            const response = await productService.updateProduct(id, data);
            res.status(201).json({product: response, status: "success"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
    async deleteProduct(req, res) {
        try {
            const id = req.params.pid;
            const response = await productService.deleteProduct(id);
            res.status(201).json({product: response, status: "success"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
}

export default new productController();