import cartModel from "./model/carts.model.js"; 
import productModel from "./model/products.model.js";
import ticketModel from "./model/ticket.model.js";
import userDTO from "../../dto/user.dto.js";
import userModel from "./model/users.model.js";
import sendEmail from "../../../utils/email.utils.js";
import sendMessage from "../../../utils/messages.utils.js";

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

    async getCartPurchaseDAO (id, user) {
        try {
            const cart = await cartModel.find({_id: id});
            const products = await productModel.find(); 
            let purchaseProd=[];
            let notAddedProd=[]; 
            let amount = 0;
                let prods = cart[0].products; 
                for (let i=0; i<products.length; i++) {
                    for (let j=0; j<prods.length; j++) {
                        if (prods[j]._id.toString() == products[i]._id){
                            if (prods[j].quantity > products[i].stock){
                                // No hay suficiente stock para agregar el producto a la compra 
                                console.log(`We do not have enough stock of the product ${prods[j]._id.toString()}. The product was not added to the purchase.`);
                                notAddedProd.push(products[i]);
                            }
                            if (prods[j].quantity <= products[i].stock){
                                // Stock suficiente, se procede con la compra 
                                purchaseProd.push({
                                    "_id" : products[i]._id.toString(),
                                    "name" : products[i].title,
                                    "price" : products[i].price,
                                    "quantity" : prods[j].quantity
                                }); 
                                amount = amount + (products[i].price * prods[j].quantity);
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
                        }
                    }
                }
            if (purchaseProd.length == 0) 
                return `The cart is empty. The following products cannot be purchased: ${notAddedProd}`
            if (notAddedProd.length > 0) 
                console.log(`The following products cannot be purchased: ${notAddedProd}`) 
            const date = new Date().toISOString(); 
            const fullUser = await userModel.findOne({email: user.email});
            const userdto = new userDTO(fullUser); 
            const ticket = {
                "code" : `ticketcode-${date}`,
                "purchase_datetime": new Date().toLocaleString(),
                "purchase_products": purchaseProd,
                "amount": amount,
                "purchaser": userdto
            }
            await ticketModel.create(ticket); 
            await sendEmail(ticket);    // Envío del correo
            await sendMessage(ticket);  // Envío de sms
            return ticket; 
        } catch (error) {
            throw new Error (error.message);
        }
    }

}