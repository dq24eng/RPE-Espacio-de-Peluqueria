import {sessionsRepository} from "../models/repositories/repository.js"
import config from "../config/enviroment.config.js";
import logger from "../utils/logger.utils.js";
import { faker } from '@faker-js/faker/locale/es';

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
            logger.error(`${new Date().toUTCString()} - Error: ${error.message}`);
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async register (req, res) {
        try {
            const { email, role} = req.body;
            req.session.user = {"email": email, "role": role};
            return res.status(200).json({payload: "Registered"})
        } catch (error) {
            logger.error(`${new Date().toUTCString()} - Error: ${error.message}`);
            res.status(400).json({error: error.message, status: "failed"});
        }
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
            logger.error(`${new Date().toUTCString()} - Error: ${error.message}`);
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async githubcallback (req, res) {
        try {
            req.session.user = req.user;
            res.redirect('/')
        } catch (error) {
            logger.error(`${new Date().toUTCString()} - Error: ${error.message}`);
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async current (req, res) {
        try {
            const {user} = req.session;
            const currentUser = await sessionsRepository.current(user); 
            return res.status(200).json({message: "Current user", payload: currentUser})
        } catch (error) {
            logger.error(`${new Date().toUTCString()} - Error: ${error.message}`);
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async restart (req, res) {
        try {
            const {email} = req.body;
            if (!email) {
                logger.error(`${new Date().toUTCString()} - Error: Incomplete Values`);
                return res.status(400).send({status:"error", error:"Incomplete Values"});
            }
            const cookieId = faker.database.mongodbObjectId();
            res.cookie('restartPassCookie', cookieId, {
				signed: true,
				maxAge: 60*1*1000, // Expira en 1 hora
			});
            const restartPassUser = await sessionsRepository.restart(email, req);
            return restartPassUser == undefined ?  
                res.status(404).send({status:"error", error:"User not found"}) : 
                res.status(200).json({message: "Restart password process started", payload: restartPassUser})
        } catch (error) {
            logger.error(`${new Date().toUTCString()} - Error: ${error.message}`);
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async restartPass(req, res) {
        try {
            const {email, password} = req.body;
            const restartPassUser = await sessionsRepository.restartPassword(email, password);
            if (restartPassUser == undefined) {
                res.status(400).json({error: error.message, status: "failed"})
            } else {
                res.status(200).json({message: "Restart password process completed", payload: restartPassUser})
            }
        } catch (error) {
            logger.error(`${new Date().toUTCString()} - Error: ${error.message}`);
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

}

export default new sessionController();