import express from "express"
import { deleteUser, getProfileUrl, getUserProfile, updateUser } from "./user.service.js"
import { auth } from "../../common/middleware/auth.js"
import { validation } from "../../utils/validation.js"
import { updateUserSchema } from "./user.validation.js"
import { getProfileBySharedName } from "./user.service.js"

let router = express.Router()

router.get("/profile",auth, getUserProfile)

router.put("/update_profile", auth ,validation(updateUserSchema) , updateUser)

router.delete("/delete_user", auth , deleteUser)

router.get("/get_profile_url", auth ,getProfileUrl)

router.get("/get_user_by_shared_url", getProfileBySharedName)

export default router