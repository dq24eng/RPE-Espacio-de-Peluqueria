import {Router} from "express";
import passport from 'passport';
import sessionsController from "../controllers/sessions.controller.js";

class sessionsRouter {
    constructor() {
        this.startSession = Router(); 
        this.startSession.post("/login", passport.authenticate('login'), sessionsController.login); 
        this.startSession.post(
            "/register", 
            passport.authenticate('register', {failureRedirect:'/failRegister'}), 
            sessionsController.register
        );
        this.startSession.get('/logout', sessionsController.logout);
    }
    getRouter() {
        return this.startSession;
    }
}

export default new sessionsRouter(); 