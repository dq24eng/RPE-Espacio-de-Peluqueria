import passport from "passport";
import passportJWT from "passport-jwt";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import userModel from "../models/dao/mongo/model/users.model.js";
import {createHash, isValidPassword, cookieExtractor} from "../utils.js";
import config from "./enviroment.config.js";

const LocalStrategy = local.Strategy;
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const initializedPassport = () => {

    passport.use('register', 
        new LocalStrategy({passReqToCallback:true, usernameField: 'email'}, async (req, username, password, done) => {
            const { first_name, last_name, email, age, role, phone} = req.body;
            try {
                let user = await userModel.findOne({email: username}); 
                if (user) {
                    console.log("User already exists");
                    return done(null, false)
                }
                const newUser = {first_name, last_name, email, age, password: createHash(password), role, phone, restart: false}; 
                let result = await userModel.create(newUser);
                return done(null, result); 
            } catch (error) {
                console.log("No se pudo crear el usuario")
                return done ("User error" + error);
            }
        }
    ))

    passport.use('login', 
        new LocalStrategy({passReqToCallback:true, usernameField: 'email'}, async (req, email, password, done) => {
            try {   
                const user = await userModel.findOne({ email: email });
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
            clientID: config.GITHUB_CLIENT_ID,
            clientSecret: config.GITHUB_CLIENT_SECRET,
            callbackURL: config.GITHUB_CALLBACK_URL,
        }, async (accessToken, refreshToken, profile, done)  => {
            try{
                let user = await userModel.findOne({email:profile._json.email})
                if (!user) {
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: '',
                        email: first_name,
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

    passport.use('jwt', 
        new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: config.JWT_KEY
        },
        async(jwt_payload, done )=> {
            try {
                const user = await userModel.findOne({email: jwt_payload.user.email}); 
                if (!user) return done(null, false, {message: "User not found"});
                return done(null, jwt_payload);
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.serializeUser((user, done)=> {
        done(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id);
        done(null, user )
    })
}

export default initializedPassport;