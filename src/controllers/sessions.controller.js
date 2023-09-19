import {sessionsRepository} from "../models/repositories/repository.js"
import config from "../config/enviroment.config.js";

class sessionController {

    async login (req, res) {
        const {email, password} = req.body;
        try {
            const {user, access_token} = await sessionsRepository.login(email); 
            req.session.user = {"email": user.email, "role": user.role};
            return access_token == null ? res.json({payload: "User not found"}) :
                res.cookie(config.COOKIE_EXTRACTOR_SCTKEY, access_token, { maxAge: 60*60*1000, httpOnly: true })
                    .json({payload: "Ok"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async register (req, res) {
        const { email, role} = req.body;
        req.session.user = {"email": email, "role": role};
        return res.status(200).json({payload: "Registered"})
    }

    async logout (req, res) {
        try {
            req.session.destroy((error) => {
                if (!error) {
                    return res.status(200).render("login");
                } else {
                    return res.status(500).send({ status: "Logout failed", payload: error });
                }
            });
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async githubcallback (req, res) {
        try {
            req.session.user = req.user;
            res.redirect('/')
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async current (req, res) {
        try {
            const {user} = req.session;
            const currentUser = await sessionsRepository.current(user); 
            return res.status(200).json({message: "Current user", payload: currentUser})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

}

export default new sessionController();