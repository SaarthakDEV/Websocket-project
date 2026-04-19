import express from "express";
import * as userController from "../controller/users.controller.js"

const userRouter = express.Router();

userRouter.get("/friends/:id",userController.getFriends )

export default userRouter;