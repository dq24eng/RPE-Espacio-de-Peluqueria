import userModel from "./model/users.model.js"
import { generateToken, createHash } from "../../../utils.js";
import logger from "../../../utils/logger.utils.js";
import { sendRestoreEmail } from "../../../utils/email.utils.js";

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

    async restartDAO (email, req){
        try {
            const user = await userModel.findOne({email});
            if(!user) {
                logger.error(`${new Date().toUTCString()} - Error: User not found`);
                return undefined;
            }
            logger.info(`${new Date().toUTCString()} - Please, check your email ${email} to restore your password`)
            user.restart = true;
            await userModel.updateOne({ _id: user._id }, user);
            const resPassCookie = await req.signedCookies["restartPassCookie"];
            sendRestoreEmail(user, resPassCookie);
            return true;
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async restartPasswordDAO (email, password) {
        try {
            const user = await userModel.findOne({email});
            const newHashedPass = createHash(password);
            if (user.password == newHashedPass) {
                logger.error(`${new Date().toUTCString()} - You cannot use an old password`)
                return undefined; 
            }
            user.restart = false;
            await userModel.updateOne({ _id: user._id }, user);
            const newUser = await userModel.updateOne({_id:user._id}, {$set:{password:newHashedPass}});
            return newUser;
        } catch (error) {
            throw new Error (error.message);
        }
    }

}