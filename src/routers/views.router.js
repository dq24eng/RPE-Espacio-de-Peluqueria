import {Router} from "express";
import viewsController from '../controllers/views.controller.js'; 

class viewsRouter {
    constructor() {
        this.startView = Router(); 
        this.startView.get("/products", viewsController.getProductsView); 
    }
    getRouter() {
        return this.startView;
    }
}

export default new viewsRouter(); 