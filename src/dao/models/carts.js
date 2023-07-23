import mongoose from "mongoose";

const cartsCollection = 'carts';
/*
const cartsSchema = mongoose.Schema({
    idCart: {
        type: Number,
        required: true,
    },
    products: {
        type: Array,
        required: true,
    },
    quantities: {
        type: Array,
        required: true,
    }
})
*/

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

export const cartModel = mongoose.model(cartsCollection, cartsSchema);
