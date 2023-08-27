import {Router} from "express";
import viewsController from '../controllers/views.controller.js'; 

class viewsRouter {
    constructor() {
        this.startView = Router(); 
        this.startView.get("/products", viewsController.getProductsView); 
        this.startView.get("/products/:pid", viewsController.getProductView); 
    }
    getRouter() {
        return this.startView;
    }
}

export default new viewsRouter(); 