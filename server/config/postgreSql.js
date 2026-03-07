import dotenv from "dotenv";
dotenv.config();
import { Client } from "pg";

const client = new Client({
    user: "postgres",
    host: "localhost",
    port: process.env.DB_PORT,
    database: "chats",
    password: process.env.DB_PASSWORD
})

export const connectToDB = async () => {
    try{
        console.log(typeof process.env.DB_PASSWORD)
        await client.connect();
        console.log("Database is connected");
    }catch(err){
        console.log("Error connecting database", err.message);
    }
};  

export default client;