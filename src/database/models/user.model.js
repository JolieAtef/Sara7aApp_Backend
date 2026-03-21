import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    sharedProfileName:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    isVerify:{
        type:Boolean,
        required:true
    },
    otp:{
        type:String
    }
},{
    timestamps:true
})


export const userModel = mongoose.model("users",userSchema)