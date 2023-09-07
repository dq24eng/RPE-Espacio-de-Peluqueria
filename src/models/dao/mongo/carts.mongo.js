import cartModel from "./model/carts.model.js"; 
import productModel from "./model/products.model.js";
import ticketModel from "./model/ticket.model.js";

export class CartsMongoDAO{
    constructor() {}

    async getCartsDAO () {
        try {
            const response = await cartModel.find();
            if(!response) return "No carts found"
            return response;
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async getCartDAO (id) {
        try {
            const response = await cartModel.find({_id: id});
            return response.length == 0 ? "Cart not found" : response
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async getCartPurchaseDAO (id) {
        try {
            const cart = await cartModel.find({_id: id});
            const products = await productModel.find(); 
            let purchaseProd=[];
            Object.entries(cart).forEach(async ([key, value])=>{
                let prods = value.products; 
                for (let i=0; i<products.length; i++) {
                    for (let j=0; j<prods.length; j++) {
                        if (prods[j]._id.toString() == products[i]._id){
                            if (prods[j].quantity > products[i].stock){
                                // No hay suficiente stock para agregar el producto a la compra 
                                console.log(`We do not have enough stock of the product ${prods[j]._id.toString()}. The product was not added to the cart`);
                            }
                            if (prods[j].quantity <= products[i].stock){
                                // Stock suficiente, se procede con la compra 
                                purchaseProd.push({
                                    "_id" : products[i]._id.toString(),
                                    "name" : products[i].title,
                                    "price" : products[i].price,
                                    "quantity" : prods[j].quantity
                                }); 
                                await productModel.updateOne({ _id: products[i]._id }, {
                                    "title": products[i].title,
                                    "description" : products[i].description,
                                    "price": products[i].price,
                                    "thumbnail" : products[i].thumbnail,
                                    "code": products[i].code,
                                    "stock": products[i].stock - prods[j].quantity,
                                    "status": products[i].status,
                                    "category": products[i].category
                                });
                            }
                            //console.log(purchaseProd); 
                        }
                    }
                }
            })
        } catch (error) {
            throw new Error (error.message);
        }
    }

}