import express from "express";
import * as messageController from "../controller/messages.controller.js";

const messageRouter = express.Router();

messageRouter.get("/:user_id/:friend_id", messageController.getUserMessages)

export default messageRouter;