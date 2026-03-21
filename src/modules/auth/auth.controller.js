import express from "express"
import { forgetPassword, generateNewAccessToken, login, resetPassword, signUp, verifyAccount } from "./auth.service.js"
import { auth } from "../../common/middleware/auth.js"
import { validation } from "../../utils/validation.js"
import { signUpSchema } from "./auth.validation.js"
import { loginSchema } from "./auth.validation.js"
import { upload } from "../../common/middleware/multer.js"

let router = express.Router()

router.post("/signup",validation(signUpSchema), upload.single("image"),signUp)

router.post("/login",validation(loginSchema),login)

router.get("/verify_account/:token",verifyAccount)

router.put("/forget_password", forgetPassword)

router.put("/reset_password", resetPassword)

router.get("/refresh_token", generateNewAccessToken)

export default router