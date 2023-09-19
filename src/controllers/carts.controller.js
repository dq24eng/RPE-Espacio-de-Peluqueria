import {cartsRepository} from '../models/repositories/repository.js';
import logger from '../utils/logger.utils.js';

class cartsController {
    async getCarts (req, res) {
        try {
            const response = await cartsRepository.getCarts(); 
            res.status(201).json({carts: response, status: "success"})
        } catch (error) {
            logger.error(`${new Date().toUTCString()} - GetCarts Error: ${error.message}`)
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async getCart (req, res) {
        try {
            const response = await cartsRepository.getCart(req.params.cid); 
            res.status(201).json({carts: response, status: "success"})
        } catch (error) {
            logger.error(`${new Date().toUTCString()} - GetCart Error: ${error.message}`)
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async getCartPurchase (req, res) {
        try {
            const ticket = await cartsRepository.getCartPurchase(req.params.cid, req.session.user); 
            res.status(201).json({carts: ticket, status: "success"})
        } catch (error) {
            logger.error(`${new Date().toUTCString()} - GetCartPurchase Error: ${error.message}`)
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
}

export default new cartsController();

