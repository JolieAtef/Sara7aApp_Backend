import joi from "joi"

export const updateUserSchema = joi.object({
    name:joi.string().optional().min(2).max(20) ,
    email:joi.string().email().optional(),
    password:joi.string().optional().min(8).pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$")),
    oldPassword: joi.string().optional().min(8).pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$")).valid(joi.ref("password")).messages({"message.valid":"password doesn`t match"}),
    sharedProfileName:joi.string().optional().min(5).max(20),
    role:joi.string().optional()
})