import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    upvotes: {
        type:Number
    },
    description: {
        type:String
    },
    urlArray: [String],
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



export const Post = mongoose.model('Post',postSchema)