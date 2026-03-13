import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const db_url = process.env.DB_URL;
export const databaseConnection =()=>{
    mongoose.connect(db_url).then(()=>{
        console.log("database connected")
    }).catch((err)=>{
        console.log(err)
    })
}