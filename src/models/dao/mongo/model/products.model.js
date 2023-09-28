import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
    },
    owner: {    // Persona que creó el producto
        type: String,
        default: "admin",
        required: true,
    }
})

productsSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productsCollection, productsSchema);
export default productModel;