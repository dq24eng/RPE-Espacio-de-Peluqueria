import mongoose from "mongoose";

const userCollection = 'Users'
const userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: String,
    password: String,
    role: {
        type: String,
        default: "user",
        require: true,
    },
    phone: String
})

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;