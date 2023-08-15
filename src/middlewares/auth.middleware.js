import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET_KEY_JWT = process.env.JWT_KEY; 
const auth = (req, res, next) => {
    const authHeader = req.headers.authorization; //Obtenemos los datos del header
    //console.log(req.headers)
    //console.log(authHeader)
    if (!authHeader) return res.status(401).json({error:'Not authenticated'})
    const token = authHeader.split(" ")[1]; // si existe obtenemos el token 
    //Se divide el espacio "Bearer " -> posicion 1 y el token 
    jwt.verify(token, SECRET_KEY_JWT, (error, credentials) => { // Validamos el token
        if (error) return res.status(403).json({error: 'Not authorized'});
        req.user = credentials;
        next();
    });
}

export default auth;