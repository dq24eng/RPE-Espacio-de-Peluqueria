import passport from "passport";
import local from "passport-local";

import userModel from "../dao/models/Users.model.js"
import {createHash, isValidPassword} from "../utils.js";

const LocalStrategy = local.Strategy;
const initializedPassport = ()=> {
    passport.use('register', 
        new LocalStrategy({passReqToCallback:true, usernameField: 'email'}, async (req, username, password, done) => {
            const { first_name,last_name,email, age, role} = req.body;
            try {
                let user = await userModel.findOne({email:username});
                if (user) console.log("User already exists");
                const newUser = {first_name, last_name, email, age, password: createHash(password), role}; 
                let result = await userModel.create(newUser);
                return done(null, result); 
            } catch (error) {
                return done ("Error de usuario" + error);
            }
        }
    ))

    passport.serializeUser((user, donde)=> {
        donde(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id);
        done(null, user )
    })
}

export default initializedPassport;