import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   
    email : {
        type: String,
        unique : true,
        required : true
    },
    password : {
        type: String,
        required : true
    },
    name : {
        type : String , 
        required: true
    },
    role : {
        type : String,
        required : true ,
        enum : ["user" , "ngo"],
        default : 'user'
    }
})

const User = mongoose.model("User" , userSchema)

export default User