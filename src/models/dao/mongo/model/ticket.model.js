import mongoose from "mongoose";

const ticketCollection = 'ticket'; 

const ticketSchema = mongoose.Schema({
    code: {
		type: String,
		unique: true,
	},
    purchase_datetime: String,  //Fecha y hora exacta en la cual se formalizó la compra.
    purchase_products: Array,   //Lista de productos. 
    amount: Number,             //Total de la compra.
    purchaser: Object,          //Correo del usuario aociado al carrito.
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);
export default ticketModel;

