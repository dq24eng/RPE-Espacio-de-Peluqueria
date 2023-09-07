//import cartService from '../services/cart.service.js'
import {cartsRepository} from '../models/repositories/repository.js';

class cartsController {
    async getCarts (req, res) {
        try {
            const response = await cartsRepository.getCarts(); 
            res.status(201).json({carts: response, status: "success"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async getCart (req, res) {
        try {
            const response = await cartsRepository.getCart(req.params.cid); 
            res.status(201).json({carts: response, status: "success"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async getCartPurchase (req, res) {
        try {
            const response = await cartsRepository.getCartPurchase(req.params.cid); 
            res.status(201).json({carts: response, status: "success"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
}

export default new cartsController();

