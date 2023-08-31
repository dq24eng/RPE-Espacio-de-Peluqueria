import {Router} from "express";
import cartsController from '../controllers/carts.controller.js'

class cartRouter {
    constructor() {
        this.startCart = Router(); 
        this.startCart.get("/", cartsController.getCart); 
    }
    getRouter() {
        return this.startCart;
    }
}

export default new cartRouter(); 