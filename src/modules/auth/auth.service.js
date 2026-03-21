
import { userModel } from "../../database/models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { generateToken } from "../../common/middleware/auth.js";
import { sendEmail } from "../../common/email/sendEmail.js";
import { env } from "../../../config/env.service.js";

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
    // let otp = Math.floor(100000+Math.random()*900000)
    let data  = await userModel.insertMany({name , email , password:hashPassword , sharedProfileName ,isVerify:false ,image})
    if(data){
        // sendEmail(email , "verify account" ,`your otp is ${otp}`)
        let token = jwt.sign({email}, env.Verify_token_signature)
        let verifyBtn = `<button><a href="${env.Base_url}/auth/verify_account/${token}">Verify</a></button>`
        sendEmail(email , "verify account" , "click here to verify your account",verifyBtn)
        res.json({message:"user added" , data})
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
    if(!user.isVerify){ 
        return res.json({message:"user not verified"})
    }
    let login = await bcrypt.compare(password , user.password)
    if(login){
        let{accessToken,refreshToken} = generateToken(user)
        res.json({message:"login successfully", accessToken , refreshToken})
    }else{
        res.json({message:"password is wrong"})
    }
}


export const verifyAccount = async(req ,res)=>{
    let {token}= req.params
    let decode = jwt.verify(token ,env.Verify_token_signature)
    let email = decode.email
    let user = await userModel.findOne({email}) 
    if(!user){
        return res.json({message:"user not found"})
    }
    if(user.isVerify){
        return res.json({message:"user already verified"})
   }
    let verifiedUser= await userModel.findByIdAndUpdate(user._id,{isVerify:true} , {new:true} )
    if(verifiedUser){
        res.json({message:"user verified successfully"})
    }else{
        res.json({message:"user verification failed"})
    }
}



//>>>>>> verify account with otp sent in email when user sign up 

// export const verifyAccount=async(req ,res )=>{
//     let {email , otp} = req.body
//     let user = await userModel.findOne({email})
//     if(!user){
//         return res.json({message:"user not found"})
//     }
//     if(user.isVerify){
//         return res.json({message:"user already verified"})
//     }
//     if(user.otp == otp){
//         let verifyUser = await userModel.findByIdAndUpdate(user._id ,{isVerify:true , otp:null},{new:true})
//         res.json({message:"user verified successfully"})
//     }else{
//         res.json({message:"user verification failed"})
//     }
// }


export const forgetPassword = async (req , res)=>{
    let {email} = req.body
    let existedUser = await userModel.findOne({email})
    if(!existedUser){
        return res.json({messsage:"user not found"})
    }

    let otp = Math.floor(100000+Math.random()*900000)
    existedUser.otp= otp
    await existedUser.save()
    sendEmail(email,"forget password",`your otp code to reset password is ${otp}`)
    return res.json({message:"otp sent"})
}


export const resetPassword= async(req , res)=>{
    let{otp ,email , password ,confirmPassword}= req.body
    let existedUser = await userModel.findOne({email})
    if(!existedUser){
        return res.json({messsage:"user not found"})
    }
    if(existedUser.otp != otp){
        return res.json({message:"otp doesn't match"})
    }
    if(password != confirmPassword){
        return res.json({message:"confirm password doesn't match"})
    }
    let hashedPassword = await bcrypt.hash(password , 10)
    let resetUser = await userModel.findByIdAndUpdate(existedUser._id , {password:hashedPassword},{new :true})
    if(resetUser){
        existedUser.otp = null
        await existedUser.save()
        res.json({message:"password updated"})
    }else{
        res.json({message:"something went wrong"})
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