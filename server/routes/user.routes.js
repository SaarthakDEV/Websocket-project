import express from "express";
import * as userController from "../controller/users.controller.js"

const userRouter = express.Router();

userRouter.get("/friends/:id",userController.getFriends )
userRouter.get("/users",userController.getUsers )
userRouter.post("/friends/:id",userController.addFriends )
userRouter.get("/online/:id", userController.isUserOnline)

export default userRouter;