import { userModel } from "../../database/models/user.model.js";
import bcrypt from "bcrypt"

export const getUserProfile= async(req ,res )=>{
    let user = await userModel.findById(req.user.id)
    if(user){
        res.json({message:"user profile",user})
    }else{
        res.json({message:"user not found"})
    }
}

export const updateUser= async(req ,res)=>{
    let { name , password , oldPassword, sharedProfileName }= req.body
    let user = await userModel.findById(req.user.id)
    let updatedUser ={}
    name? updatedUser.name =name :null
    sharedProfileName? updatedUser.sharedProfileName=sharedProfileName:null
    if(password){
        let checkOld = await bcrypt.compare(oldPassword , user.password)
        if(checkOld){
            let hashPassword = await bcrypt.hash(password, 10)
            updatedUser.password=hashPassword
        }else{
           res.json({message:"old password is wrong"})
        }
    }

    let update= await userModel.findByIdAndUpdate(req.user.id , updatedUser , {new :true})
    if(update){
        res.json({message:"user updated"})
    }else{
        res.json({message:"user not found"})
    }
}


export const deleteUser = async(req , res)=>{
     let deletedUser = await userModel.findByIdAndDelete(req.user.id)
     if(deletedUser){
        res.json({message:"user deleted"})
     }else{
        res.json({message:"user not found"})
     }
}


export const getProfileUrl = async (req ,res)=>{
    let user = await userModel.findById(req.user.id)
    if(user){
        let profileUrl = `https://localhost:3000/${user.sharedProfileName}` //frontend domain to display user
        res.json({message:"profile url",profileUrl})
    }else{
        res.json({message:"user not found"})
    }
}

export const getProfileBySharedName = async (req ,res)=>{
    let {url} = req.body
    let sharedName = url.split("/")[3]
    let user = await userModel.findOne({sharedProfileName:sharedName }).select("-password -__v -role")
    if(user){
        res.json({message:"user profile",user})
    }else{
        res.json({message:"user not found"})
    }
}