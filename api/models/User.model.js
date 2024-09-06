import mongoose from 'mongoose';

//create a user schema

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        require: true,
        unique: true,   //for unique username     
    },
    email: {
        type:String,
        require: true,
        unique: true,   //for unique username     
    },
    password: {
        type:String,
        require: true,  
    },
}, { timestamps: true });     //it automatically gives you the time when user logs in

const User = mongoose.model("User",userSchema);
export default User;