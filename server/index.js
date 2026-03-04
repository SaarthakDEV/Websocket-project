import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import initializeSocket from "./config/socket.js";

const app = express();
const server = http.createServer(app);

initializeSocket(server);
const PORT = process.env.SERVER_PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
