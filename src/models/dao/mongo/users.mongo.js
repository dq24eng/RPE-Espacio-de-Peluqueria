import userModel from "./model/users.model.js";

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
}