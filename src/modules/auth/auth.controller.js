import express from "express"
import { generateNewAccessToken, login, signUp } from "./auth.service.js"
import { auth } from "../../common/middleware/auth.js"
import { validation } from "../../utils/validation.js"
import { signUpSchema } from "./auth.validation.js"
import { loginSchema } from "./auth.validation.js"
import { upload } from "../../common/middleware/multer.js"

let router = express.Router()

router.post("/signup",validation(signUpSchema), upload().single("image"),signUp)

router.post("/login",validation(loginSchema),login)

router.get("/refresh_token", generateNewAccessToken)

export default router