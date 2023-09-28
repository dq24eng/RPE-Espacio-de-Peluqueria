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
        default: "user",    // User, Admin & Premium
        require: true,
    },
    phone: String,
    restart: {
        type: Boolean,      
        default: false,     // Restore password -> false by default 
    }
})

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;