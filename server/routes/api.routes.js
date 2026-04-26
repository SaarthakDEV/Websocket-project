import express from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import messageRouter from "./messages.routes.js";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/messages", messageRouter);

export default apiRouter;