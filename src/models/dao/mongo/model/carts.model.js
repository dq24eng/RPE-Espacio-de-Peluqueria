import mongoose from "mongoose";

const cartsCollection = 'carts';
const cartsSchema = mongoose.Schema({
    // Array de objetos que contienen los productos que se incluyen en cada carrito 
    products: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: Number,
        }
    ]
});

const cartModel = mongoose.model(cartsCollection, cartsSchema);
export default cartModel; 