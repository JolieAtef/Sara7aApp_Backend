import nodemailer from "nodemailer"
import { env } from "../../../config/env.service.js"


export const sendEmail=async(email , subject , text ,html)=>{
    let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth:{
            user:env.Email_user,
            pass:env.Email_password
        },
    })

   
    let info = await transporter.sendMail({
        from:"Sara7a app",
        to:email,
        subject:subject, 
        text:text,
        html
    })
}