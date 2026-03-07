import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import cors from "cors";
import initializeSocket from "./config/socket.js";
import apiRouter from "./routes/api.routes.js";
import { connectToDB } from "./config/postgreSql.js";

const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);

initializeSocket(server);
const PORT = process.env.SERVER_PORT || 5000;

app.use("/api", apiRouter);
app.get("/test", async (req,res) => {
  return res.send("Server running fine on PORT")
})

server.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server running on port ${PORT}`);
});
