import express from 'express'
import * as userController from "../controllers/userControllers.js"
import rateLimiter from "../middleware/rateLimiter.js"

const userRoute = express.Router()

userRoute.get("/", userController.getAllUser)
userRoute.get("/:id", userController.getUserById)
userRoute.post("/", rateLimiter, userController.createUser)
userRoute.put("/:id", rateLimiter, userController.updateUserById)
userRoute.delete("/:id", userController.deleteUserById)

export default userRoute