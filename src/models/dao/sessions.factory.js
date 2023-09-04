import config from "../../config/enviroment.config.js";

let sessionsDAO;
const PERSISTENCE = config.DATASOURCE; 

switch (PERSISTENCE) {
    case "MEMORY": {
        const {SessionsMemoryDAO} = await import ("../dao/memory/sessions.memory.js");
        sessionsDAO = new SessionsMemoryDAO(); 
        break;
    }
    case "MONGO": {
        const {SessionsMongoDAO} = await import ("../dao/mongo/sessions.mongo.js");
        sessionsDAO = new SessionsMongoDAO(); 
        break;
    }
    default: {
        throw new Error("Invalid persistence"); 
    }
}

export default sessionsDAO; 