import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    receiverId:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    content:{
        type: String,
        required:true
    },
    image:{
        type:[String]
    }
})

export const messageModel = mongoose.model("messages",messageSchema)