import sessionsService from "../services/sessions.service.js";
import config from "../config/enviroment.config.js";

class sessionController {

    async login (req, res) {
        const {email, password} = req.body;
        try {
            const {user, access_token} = await sessionsService.login(email); 
            req.session.user = {"email": user.email, "role": user.role};
            return access_token == null ? res.json({payload: "User not found"}) :
                res.cookie(config.COOKIE_EXTRACTOR_SCTKEY, access_token, { maxAge: 60*60*1000, httpOnly: true })
                    .json({payload: "Ok"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
}

export default new sessionController();