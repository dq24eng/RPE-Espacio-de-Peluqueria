import {Router} from "express";
import userController from "../controllers/user.controller.js"; 

class userRouter {
    constructor() {
        this.startUser = Router();
        this.startUser.put("/premium/:uid", userController.updateRole);
    }
    getRouter() {
        return this.startUser;
    }
}

export default new userRouter(); 