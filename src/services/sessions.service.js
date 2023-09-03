import userModel from "../models/dao/mongo/model/users.model.js";
import { generateToken } from "../utils.js";

class sessionsService {

    async login (email) {
        try {
            const user =await userModel.findOne({email});
            if(!user) return null
            const access_token = generateToken({email});
            return {user, access_token}
        } catch (error) {
            throw new Error (error.message);
        }
    }

}

export default new sessionsService(); 