import { cartModel } from "../models/dao/mongo/model/carts.model.js";

class cartService {
    async getCarts(){
        const result = await cartModel.find();
        return result; 
    }
}

export default new cartService(); 