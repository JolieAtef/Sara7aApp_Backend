import express from "express"
import { validation } from "../../utils/validation.js"
import { addMessageSchema } from "./message.validation.js"
import { auth } from "../../common/middleware/auth.js"
import { deleteMessage, getMessageById, getUserMessages, sendMessage } from "./message.service.js"
import { upload } from "../../common/middleware/multer.js"

let router = express.Router()

router.post("/send_message",validation(addMessageSchema),upload.array("images",5),sendMessage)

router.get("/get_user_messages",auth,getUserMessages)

router.get("/get_message_by_id/:messageId", auth, getMessageById)

router.delete("/delete_message/:messageId",auth , deleteMessage)

export default router