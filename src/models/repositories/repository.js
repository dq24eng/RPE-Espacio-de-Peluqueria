import productsDAO from "../dao/products.factory.js";
import ProductsRepository from "./products.repository.js";
export const productsRepository = new ProductsRepository(productsDAO); 

import sessionsDAO from "../dao/sessions.factory.js"; 
import SessionsRepository from "./sessions.repository.js"; 
export const sessionsRepository = new SessionsRepository(sessionsDAO); 

import cartsDAO from "../dao/carts.factory.js"; 
import CartsRepository from "./carts.repository.js";
export const cartsRepository = new CartsRepository(cartsDAO); 

import usersDAO from "../dao/users.factory.js"; 
import usersRepository from "./users.repository.js";
export const UsersRepository = new usersRepository(usersDAO);

