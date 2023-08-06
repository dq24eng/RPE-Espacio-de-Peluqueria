import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/Users.model.js"
import {createHash, isValidPassword} from "../utils.js";
import GitHubStrategy from "passport-github2"

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

    passport.use('login', 
        new LocalStrategy({passReqToCallback:true, usernameField: 'email'}, async (req, username, password, done) => {
            //const { first_name,last_name,email, age, role} = req.body;
            try {   
                const user = await userModel.findOne({ email: username });
                //console.log(user)
                if (!user) return done(null, false, { message: 'User doesnt exist' });
                if (!isValidPassword(user, password)) {
                    console.log("Invalid credentials")
                    return done(null, false, { message: 'Invalid credentials' });
                }
                return done(null, user);
            } catch (error) {
                return done ("Error de usuario" + error);
            }
        })
    )      

    passport.use('github', 
        new GitHubStrategy({
            clientID: "Iv1.50728fd82d48f4c8",
            clientSecret: "906090a74798de0101644155a0136df27affbb38",
            callbackURL: "http://localhost:8080/api/sessions/githubcallback",
        }, async (accessToken, refreshToken, profile, done)  => {
            try{
                let user = await userModel.findOne({email:profile._json.email})
                if (!user) {
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: '',
                        email: profile._json.email,
                        age: '',
                        password: '',
                    } 
                    let result = await userModel.create(newUser);
                    done(null, result )
                } else {
                    done(null, user)
                }
            } catch(error) {
                return done(error)
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