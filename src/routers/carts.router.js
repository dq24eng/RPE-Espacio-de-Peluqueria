import {Router} from "express";
import cartsController from '../controllers/carts.controller.js'

class cartRouter {
    constructor() {
        this.startCart = Router(); 
        this.startCart.get("/", cartsController.getCarts); 
        this.startCart.get("/:cid", cartsController.getCart); 
        this.startCart.get("/:cid/purchase", cartsController.getCartPurchase);
    }
    getRouter() {
        return this.startCart;
    }
}

export default new cartRouter(); 