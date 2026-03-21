import express from "express"
import { databaseConnection } from "./database/connection.js"
import authRouter from "./modules/auth/auth.controller.js"
import userRouter from "./modules/user/user.controller.js"
import messageRouter from "./modules/message/message.controller.js"


export const bootstrap = async ()=>{
    
    const app = express()
    app.use(express.json())

    await databaseConnection()
    app.use("/auth",authRouter)
    app.use("/user",userRouter)
    app.use("/message",messageRouter)
    
    app.use(express.urlencoded({extended:true}))
    app.use("/uploads", express.static("uploads"))


    app.listen(3000,()=>{
        console.log("server running on port 3000")
    })
}