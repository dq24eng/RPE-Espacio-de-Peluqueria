import cartService from '../services/cart.service.js'

class cartsController {
    async getCart (req, res) {
        try {
            const response = await cartService.getCarts(); 
            res.status(201).json({carts: response, status: "success"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
}

export default new cartsController();

