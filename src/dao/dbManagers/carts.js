import { cartModel } from "../models/carts.js";

export default class Carts {
    constructor() {
        console.log("Trabajando con Mongo Atlas")
    }

    getCart = async() => {
        let carts = await cartModel.find();
        return carts.map(cart => cart.toObject());
    }

    addCart = async(prods, q) => {
        let carts = await this.getCart();
        let idCart = 0;
        carts.length === 0 ? idCart = 2000 : idCart = carts[carts.length-1].idCart+1;
        let cartdb = {idCart, "products": prods, "quantities":q};
        let result = await cartModel.create(cartdb);
        return result;
    }
}

