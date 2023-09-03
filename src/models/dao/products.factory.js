import config from "../../config/enviroment.config.js";

let productsDAO;
const PERSISTENCE = config.DATASOURCE; 

switch (PERSISTENCE) {
    case "MEMORY": {
        const {ProductsMemoryDAO} = await import ("../dao/memory/products.memory.js");
        productsDAO = new ProductsMemoryDAO(); 
        break;
    }
    case "MONGO": {
        const {ProductsMongoDAO} = await import ("../dao/mongo/products.mongo.js");
        productsDAO = new ProductsMongoDAO(); 
        break;
    }
    default: {
        throw new Error("Invalid persistence"); 
    }
}

export default productsDAO; 