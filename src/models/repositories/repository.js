import productsDAO from "../dao/products.factory.js";
import ProductsRepository from "./products.repository.js";
export const productsRepository = new ProductsRepository(productsDAO); 