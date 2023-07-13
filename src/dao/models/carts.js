import mongoose from "mongoose";

const cartsCollection = 'carts';
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

export const cartModel = mongoose.model(cartsCollection, cartsSchema);
