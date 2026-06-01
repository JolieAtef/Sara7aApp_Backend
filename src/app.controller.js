import express from "express"
import cors from "cors"
import { databaseConnection } from "./database/connection.js"
import authRouter from "./modules/auth/auth.controller.js"
import userRouter from "./modules/user/user.controller.js"
import messageRouter from "./modules/message/message.controller.js"
// import client from "./database/redis.connection.js"


export const bootstrap = ()=>{
    
    const app = express()
    
    // return it when work with frontend

    app.use(cors({
        origin: "http://localhost:5173", //base url frontend
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
      }));
    app.use(express.json())

    databaseConnection()
    app.use("/auth",authRouter)
    app.use("/user",userRouter)
    app.use("/message",messageRouter)
    
    app.use(express.urlencoded({extended:true}))
    app.use("/uploads", express.static("uploads"))
     
    
    app.listen(3000,()=>{
        console.log("server running on port 3000")
    })
}