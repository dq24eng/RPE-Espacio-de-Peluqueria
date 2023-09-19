import userModel from "./model/users.model.js"
import { generateToken } from "../../../utils.js";

export class SessionsMongoDAO {
    constructor() {}

    async loginDAO(email) {
        try {
            const user =await userModel.findOne({email});
            if(!user) return null
            const access_token = generateToken({email});
            return {user, access_token}
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async currentDAO (sessionEmail) {
        try {
            const userData = await userModel.findOne({email:sessionEmail});
            return userData;
        } catch (error) {
            throw new Error (error.message);
        }
    }


}