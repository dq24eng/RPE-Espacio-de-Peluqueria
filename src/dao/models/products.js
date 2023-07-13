import mongoose from "mongoose";

const productsCollection = 'products';
const productsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price: Number,
    thumbnail: Array,
    code: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    status: Boolean,
    category: {
        type: String,
        required: true,
    }
})

export const productModel = mongoose.model(productsCollection, productsSchema);