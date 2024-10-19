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
    avatar: {
        type: String,
        default:"https://static.vecteezy.com/system/resources/previews/002/275/847/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
    },
}, { timestamps: true });     //it automatically gives you the time when user logs in

const User = mongoose.model("User",userSchema);
export default User;