import { io } from "socket.io-client";

const socket = io("ws://localhost:3241", {
    transports: ["websocket"]
});

export default socket;