
import joi from "joi"

export const signUpSchema = joi.object({
    name:joi.string().required().min(2).max(20) ,
    email:joi.string().email().required(),
    password:joi.string().required().min(8).pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$")),
    confirmPassword: joi.string().required().min(8).pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$")).valid(joi.ref("password")).messages({"message.valid":"password doesn`t match"}),
    sharedProfileName:joi.string().required().min(5).max(20),
    role:joi.string().optional().valid("user","admin").default("user")
})

export const loginSchema = joi.object({
    email:joi.string().email().required(),
    password:joi.string().required().min(8).pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$")),
})
