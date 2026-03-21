// import nodemailer from "nodemailer"
// import { env } from "../../../config/env.service.js"


// export const sendEmail=async(email , subject , text ,html)=>{
//     let transporter = nodemailer.createTransport({
//         host:"smtp.gmail.com",
//         port:465,
//         secure:true,
//         auth:{
//             user:env.Email_user,
//             pass:env.Email_password
//         },
//     })

   
//     let info = await transporter.sendMail({
//         from:"Sara7a app",
//         to:email,
//         subject:subject, 
//         text:text,
//         html
//     })
// }


import nodemailer from "nodemailer";
import { env } from "../../../config/env.service.js"

export const sendEmail = async ( email,subject,text, html,trials = 3)  => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: env.Email_user,
      pass: env.Email_password,
    },
    connectionTimeout: 5000, 
  });

  const mailOptions = {
    from: "Sara7a app",
    to: email,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (err) {
    console.error("Email error:", err.message);
    
    if (trials > 0) {
      console.log("Retrying email...");
      return await sendEmail(email, subject, text, html, trials - 1);
    }

    console.error("Final email failure");
    return null;
  }
};