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
        this.startSession.get('/github', passport.authenticate('github', {failureRedirect:'/login'}));
        this.startSession.get(
            '/githubcallback', 
            passport.authenticate('github', {failureRedirect:'/login'}), 
            sessionsController.githubcallback);
        this.startSession.get('/current', sessionsController.current);
    }
    getRouter() {
        return this.startSession;
    }
}

export default new sessionsRouter(); 