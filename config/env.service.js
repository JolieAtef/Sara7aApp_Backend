import dotenv from "dotenv"

dotenv.config({path:"./config/.env"})

let DB_URL = process.env.DB_URL
let Base_url = process.env.BASE_URL
let Verify_token_signature = process.env.VERIFY_TOKEN_SIGNATURE
let Email_user = process.env.EMAIL_USER
let Email_password = process.env.EMAIL_PASSWORD
let publicKey= process.env.IMAGEKIT_PUBLIC_KEY
let privateKey = process.env.IMAGEKIT_PRIVATE_KEY
let urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT

export const env ={
    DB_URL , Base_url , Verify_token_signature, Email_user , Email_password,
    publicKey ,privateKey, urlEndpoint
}