import joi from "joi"


export const addMessageSchema = joi.object({
    receiverId: joi.string().required(),
    content:joi.string().required(),
    image:joi.string().optional()
})