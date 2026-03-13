import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const db_url = process.env.DB_URL;
if (!db_url) {
    throw new Error("DB_URL is missing! Make sure it's set in .env or Vercel environment variables.");
  }
  
export const databaseConnection =()=>{
    mongoose.connect(db_url ,{ useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
        console.log("database connected")
    }).catch((err)=>{
        console.log(err)
    })
}