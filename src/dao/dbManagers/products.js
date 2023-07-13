import { productModel } from "../models/products.js";

export default class Products {
    constructor() {
        console.log("Trabajando con Mongo Atlas")
    }

    getAll = async()=> {
        let products = await productModel.find();
        return products.map(prod => prod.toObject());
    }

    createProduct = async(product) => {
        let result = await productModel.create(product);
        return result;
    }
}