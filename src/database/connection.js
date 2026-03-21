import mongoose from "mongoose";
import { env } from "../../config/env.service.js";

export const databaseConnection =()=>{
    mongoose.connect(env.DB_URL).then(()=>{
        console.log("database connected")
    }).catch((err)=>{
        console.log(err)
    })
}