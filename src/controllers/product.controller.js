import {productsRepository} from '../models/repositories/repository.js';

class productController {
    async getProducts(req, res) {
        try {
            const response = await productsRepository.getProducts(); 
            res.status(201).json({products: response, status: "success"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
    async getProduct(req, res) {
        try {
            const response = await productsRepository.getProduct(req.params.pid); 
            res.status(201).json({products: response, status: "success"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
    async createProduct(req, res) {
        try {
            const data = req.body; 
            const response = await productsRepository.createProduct(data);
            res.status(201).json({product: response, status: "success"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
    async updateProduct(req, res) {
        try {
            const data = req.body; 
            const id = req.params.pid;
            const response = await productsRepository.updateProduct(id, data);
            res.status(201).json({product: response, status: "success"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
    async deleteProduct(req, res) {
        try {
            const id = req.params.pid;
            const response = await productsRepository.deleteProduct(id);
            res.status(201).json({product: response, status: "success"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
}

export default new productController();