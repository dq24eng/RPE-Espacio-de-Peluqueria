import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET_KEY_JWT = process.env.JWT_KEY; 

/*
const auth = (req, res, next) => {

    // Con local storage
    // const authHeader = req.headers.authorization; //Obtenemos los datos del header
    // if (!authHeader) return res.status(401).json({error:'Not authenticated'})
    // const token = authHeader.split(" ")[1]; // si existe obtenemos el token 
    
    // Con JWT Cookies 
    const token = req.cookies["CoderCookie"];
    if (!token) return res.status(401).json({error:'Not authenticated'})

    //Se divide el espacio "Bearer " -> posicion 1 y el token 
    jwt.verify(token, SECRET_KEY_JWT, (error, credentials) => { // Validamos el token
        if (error) return res.status(403).json({error: 'Not authorized'});
        req.user = credentials;
        next();
    });
}

*/

// JWT authentication with cookies 

const auth = (role) => {
    return async (req, res,next) => {
        //console.log(req.session.user)
        if(!req.session.user) {
            return res.status(401).json({error: "Not authenticated"})
        }
        if(req.session.user.role !== role) {
            return res.status(403).json({error: "Access Denied"})
        }
        next()
    }
}



export default auth;