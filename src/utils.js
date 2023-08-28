import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt, { genSaltSync } from 'bcrypt';
import config from './config/enviroment.config.js';
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;

//Llamado para creación de Hash
export const createHash = password => bcrypt.hashSync(password, genSaltSync(parseInt(config.HASH_LENGTH)));
//Validación de datos
export const isValidPassword =(user, password) => bcrypt.compareSync(password, user.password);

// Cookie extractor
export const cookieExtractor =(req)=> {
    let token = null;
    if(req && req.cookies) token = req.cookies[config.COOKIE_EXTRACTOR_SCTKEY]
    return token
}

// JWT Token generator 
export const generateToken = (user) => {    //Función que define objeto con el que se trabaja, llave y tiempo de vida del token
    const token = jwt.sign({user}, config.JWT_KEY, {expiresIn: config.JWT_EXPIRATION});
    return token;
}
