import config from "../../config/enviroment.config.js";

let usersDAO;
const PERSISTENCE = config.DATASOURCE; 

switch (PERSISTENCE) {
    case "MEMORY": {
        const {UsersMemoryDAO} = await import ("../dao/memory/users.memory.js");
        usersDAO = new UsersMemoryDAO(); 
        break;
    }
    case "MONGO": {
        const {UsersMongoDAO} = await import ("../dao/mongo/users.mongo.js");
        usersDAO = new UsersMongoDAO(); 
        break;
    }
    default: {
        throw new Error("Invalid persistence"); 
    }
}

export default usersDAO; 