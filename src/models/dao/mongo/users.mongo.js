import userModel from "./model/users.model.js";
import userDTO from "../../dto/user.dto.js";
import { createHash } from "../../../utils.js";
import { deletedUserEmail } from "../../../utils/email.utils.js";

export class UsersMongoDAO {
    constructor() {}

    async updateRoleDAO (user) {
        try {
            const updtUser = await userModel.find({_id: user}); 
            updtUser[0].role == "user" ? await userModel.updateOne({_id: user}, {$set: {role: "premium"}}) : "";
            updtUser[0].role == "premium" ? await userModel.updateOne({_id: user}, {$set: {role: "user"}}) : "";
            return await userModel.find({_id: user}); 
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async getUsersDAO () {
        try {
            const usersDTO = []; 
            const users = await userModel.find(); 
            await users.forEach(user => { usersDTO.push(new userDTO(user)) });
            return usersDTO == [] ? "No users found" : usersDTO;
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async createUsersDAO (user) {
        try {
            const newUser = user; 
            newUser.lastSession = new Date();
            newUser.password = createHash(user.password);
            await userModel.create(newUser); 
            return newUser;
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async getFullUsersDAO () {
        try {
            const users = await userModel.find(); 
            return users;
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async deleteFunction (user) {
        const deletedUser = await userModel.deleteOne({_id: user._id})
        deletedUserEmail(user); 
    }

    async delExpUsersDAO(users) {
        try {
            const currentDate = new Date();
            users.forEach(usr => {
                const tsls = Date.parse(currentDate) - Date.parse(usr.lastSession); // Time since last session
                const mins = Math.floor((tsls / 1000) / 60);
                // const hours = Math.floor(((tsls / 1000) / 60) / 24); // Si es mayor igual a 48 horas, entonces eliminar
                if (mins >= 2880) { this.deleteFunction(usr) }
            })

        } catch (error) {
            throw new Error (error.message);
        }
    }


}