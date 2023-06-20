import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";

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