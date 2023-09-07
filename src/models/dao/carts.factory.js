import config from "../../config/enviroment.config.js";

let cartsDAO;
const PERSISTENCE = config.DATASOURCE; 

switch (PERSISTENCE) {
    case "MEMORY": {
        const {CartsMemoryDAO} = await import ("../dao/memory/carts.memory.js");
        cartsDAO = new CartsMemoryDAO(); 
        break;
    }
    case "MONGO": {
        const {CartsMongoDAO} = await import ("../dao/mongo/carts.mongo.js");
        cartsDAO = new CartsMongoDAO(); 
        break;
    }
    default: {
        throw new Error("Invalid persistence"); 
    }
}

export default cartsDAO; 