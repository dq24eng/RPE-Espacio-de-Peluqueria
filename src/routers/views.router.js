import {Router} from "express";
import viewsController from '../controllers/views.controller.js'; 
import compression from "express-compression"; 

class viewsRouter {
    constructor() {
        this.startView = Router(); 
        this.startView.get("/", viewsController.home);
        this.startView.get("/products", compression({ brotli: { enabled: true, zlib: {}}}), viewsController.getProductsView); 
        this.startView.get("/products/:pid", viewsController.getProductView); 
        this.startView.get("/login", viewsController.getLoginView);
        this.startView.get("/register", viewsController.getRegisterView); 
        
    }
    getRouter() {
        return this.startView;
    }
}

export default new viewsRouter(); 