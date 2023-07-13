import { messagesModel } from "../models/messages.js";

export default class Messages {
    constructor() {
        console.log("Trabajando con Mongo Atlas")
    }

    getAll = async()=> {
        let chat = await messagesModel.find();
        return chat.map(ch => ch.toObject());
    }

    saveMessages = async(message)=> {
        let result = await messagesModel.create(message);
        return result;
    }
}