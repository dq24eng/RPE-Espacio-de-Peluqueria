import { Strategy } from "passport-jwt"
import passport from "passport";
//import initializedPassport from "../config/passport.config.js"
//import passport from "../config/passport.config.js"

const passportControl =(strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, {session:false}, (error, user, info) => {
            //user = req.session.user;
            console.log(user)
            if (error) return next(error);
            if (!user) return res.status(401).json({error: info.message ?? `${info}`})
            //console.log(user)
            //req.session.user.email = user.user.email;
            next();
        }) (req, res, next)
    }
}

export default passportControl;