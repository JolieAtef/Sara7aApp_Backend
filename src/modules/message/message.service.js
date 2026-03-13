import { messageModel } from "../../database/models/message.model.js";
import { userModel } from "../../database/models/user.model.js";


export const sendMessage = async(req , res)=>{
     let{receiverId ,content }= req.body
     let user = await userModel.findById(receiverId)
     if(!user){
        return res.json({message:"user not found"})
     }
     let images
     if(req.files){
        images = req.files.map((file)=>`http://localhost:3000/uploads/${file.filename}`)
     }
     let addedMessage = await messageModel.insertMany({receiverId ,content , image:images})
     if(addedMessage){
        res.json({message:"message added" , addedMessage})
     }else{
        res.json({message:"something went wrong"})
     }
}

export const getUserMessages = async (req ,res)=>{
    let messages = await messageModel.find({receiverId:req.user.id})
    if(messages.length>0){
        res.json({message:"user messages", messages})
    }else{
        res.json({message:"no messages found"})
    }
}

export const getMessageById =  async (req ,res)=>{
    let{messageId}= req.params
    let message= await messageModel.findOne({_id:messageId , receiverId:req.user.id})
    if(message){
        res.json({message:"message found", message})
    }else{
        res.json({message:"no message found or user is not the owner"})
    }
}


export const deleteMessage= async (req ,res)=>{
    let{messageId}= req.params
    let message= await messageModel.findOneAndDelete({_id:messageId , receiverId:req.user.id})
    if(message){
        res.json({message:"message deleted"})
    }else{
        res.json({message:"no message found or user is not the owner"})
    }
}