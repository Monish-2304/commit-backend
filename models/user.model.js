import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: {
        type:String,
        unique:true,
        required:true
    },
    email: {
        type:String,
        unique:true,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    isAuth :{
        type:Boolean
    },
    missions :[{
        type: Schema.Types.ObjectId,
        ref:Mission
    }]
})



export const User = mongoose.model('User',userSchema)