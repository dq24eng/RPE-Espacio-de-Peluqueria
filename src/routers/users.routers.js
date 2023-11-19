import {Router} from "express";
import userController from "../controllers/user.controller.js"; 

class userRouter {
    constructor() {
        this.startUser = Router();
        this.startUser.put("/updateRole/:uid/:role", userController.updateRole);
        this.startUser.get("/",userController.getUsers); 
        this.startUser.post("/createAccount", userController.createUser);
        this.startUser.delete("/", userController.deleteExpiredUsers);
        this.startUser.delete("/deleteUser/:uid", userController.deleteUser)
    }
    getRouter() {
        return this.startUser;
    }
}

export default new userRouter(); 