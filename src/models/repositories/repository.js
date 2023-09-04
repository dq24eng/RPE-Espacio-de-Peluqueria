import productsDAO from "../dao/products.factory.js";
import ProductsRepository from "./products.repository.js";
export const productsRepository = new ProductsRepository(productsDAO); 

import sessionsDAO from "../dao/sessions.factory.js"; 
import SessionsRepository from "./sessions.repository.js"; 
export const sessionsRepository = new SessionsRepository(sessionsDAO); 

