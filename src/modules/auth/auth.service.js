
import { userModel } from "../../database/models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { generateToken } from "../../common/middleware/auth.js";

export const signUp = async (req ,res)=>{
    let { name , email , password , sharedProfileName , confirmPassword} = req.body
    let existedEmail = await userModel.findOne({email})
    if(existedEmail){
        return res.json({message:"Email already exist"})
    }
    let existedSharedProfileName = await userModel.findOne({sharedProfileName})
    if(existedSharedProfileName){
        return res.json({message:"SharedProfileName already exist"})
    }
    if(password != confirmPassword){
        return res.json({message:"password doesn`t match"})
    }
    let image
    console.log(req.file)
    if(req.file){
        image = `http://localhost:3000/uploads/${req.file.filename}`
    }
    let hashPassword = await bcrypt.hash(password,10)
    let data  = await userModel.insertMany({name , email , password:hashPassword , sharedProfileName ,image})
    if(data){
        res.json({message:"user signup" , data})
    }else{
        res.json({message:"something went wrong"})
    }
}


export const login = async(req ,res)=>{
    let {email , password}= req.body
    let user = await userModel.findOne({email})
    if(!user){
        return res.json({message:"user not found"})
    }
    let login = await bcrypt.compare(password , user.password)
    if(login){
        let{accessToken,refreshToken} = generateToken(user)
        res.json({message:"login successfully", accessToken , refreshToken})
    }else{
        res.json({message:"password is wrong"})
    }
}


export const generateNewAccessToken = async (req ,res)=>{
       let{authorization} = req.headers //refresh token
       let [ bearer , token]= authorization.split(" ")
       let signature =""
       switch(bearer){
           case "User":
               signature="s_u";
               break;
           
           case "Admin":
               signature="s_a";
               break;
   
           default:
               res.json({message:"role is invalid"})
       }
       
       let decode = jwt.verify(token , signature)
       let newAccessToken = jwt.sign({id : decode.id} ,signature , {expiresIn:"30m"})

       res.json({message:"new access token",newAccessToken})
}