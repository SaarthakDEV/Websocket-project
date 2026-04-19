import dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";

const pool = new Pool({
    user: "saarthakgupta",
    host: "localhost",
    port: process.env.DB_PORT,
    database: "chats",
    password: process.env.DB_PASSWORD
})

export const connectToDB = async () => {
    try{
        await pool.connect();
        console.log("Database is connected");
    }catch(err){
        console.log("Error connecting database", err.message);
    }
};  

export default pool;