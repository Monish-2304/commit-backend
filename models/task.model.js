import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    streakCount: {
        type:Number
    },
    missions :{
        type: Schema.Types.ObjectId,
        ref:Mission,
        required:true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:User,
        required:true
    }
},{timestamps:true})



export const Task = mongoose.model('Task',taskSchema)