import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import bcrypt, { genSaltSync } from 'bcrypt'; // Esta librería convierte las passwords en un hash, luego, cuando un usario se logea, la conotraseña que coloca la convierte en un hash y entonces compara el nuevo hash con el anteriormente generado para ese user, si coinciden, el login es correcto. 

//Llamado para creación de hash
export const createHash = password => bcrypt.hashSync(password, genSaltSync(10));
//Validacion de datos
export const isValidPassword =(user, password) => bcrypt.compareSync(password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

export const uploader =multer({storage})
export default __dirname;