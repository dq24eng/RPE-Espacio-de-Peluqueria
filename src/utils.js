import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import bcrypt, { genSaltSync } from 'bcrypt'; // Esta librería convierte las passwords en un hash, luego, cuando un usario se logea, la conotraseña que coloca la convierte en un hash y entonces compara el nuevo hash con el anteriormente generado para ese user, si coinciden, el login es correcto. 
import jwt from "jsonwebtoken";
import 'dotenv/config';

//Llamado para creación de hash
export const createHash = password => bcrypt.hashSync(password, genSaltSync(10));
//Validacion de datos
export const isValidPassword =(user, password) => bcrypt.compareSync(password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Palabra de reserva para descifrar el token que se crea 
const JWTKEY = process.env.JWT_KEY; 

// Multer -> Middleware desarrollado para poder realizar carga de archivos dentro de las peticiones, con el fin de que el 
//           cliente pueda manejar archivos como imagenes, etc; dentro de una petición. 

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, __dirname+'/public/img/');
        console.log("Ubicacion "+cb)
    }, 
    filename: function(req, file, cb){
        console.log(file);
        cb(null, file.originalname);
    }
})

// Métodos JWT

export const generateToken = (user) => {    //Función que define objeto con el que se trabaja, llave y tiempo de vida del token
    const token = jwt.sign({user}, JWTKEY, {expiresIn:'12h'});
    return token;
}

export const authToken = (req, res, next) => {  //Función responsable de la autenticación
    const headerAuth = req.headers.authorization; //Se lee la información que viene en el header 
    if(!headerAuth) return res.status(401).send( {status:"error", error: "Access denied"}) //Se define si el usuario está autorizado
    //console.log(headerAuth); 
    const token = req.headers.authorization.split('Bearer ')[1];
    //console.log(token)
    jwt.verify(token, JWTKEY, (error,credentials)=> { //Validamos que el token sea válido y no esté alterado 
        console.log(error)
        if (error) return res.status(401).send( {status:"error", error: "Access denied"});
        req.user = credentials.user;
        next()
    })
}

// Cookie extractor

export const cookieExtractor =(req)=> {
    let token = null;
    if(req && req.cookies) token = req.cookies["CoderCookie"]
    return token
}

export const uploader =multer({storage})
export default __dirname;