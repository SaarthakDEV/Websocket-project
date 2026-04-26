import pool from "../config/postgreSql.js";

export const getUserMessages = async (req, res) => {
    const { user_id, friend_id } = req.params;
    const result = await pool.query("SELECT messages FROM messages WHERE from_id = $1 AND to_id = $2", [user_id, friend_id])
    if(result.rowCount > 0){
        return res.status(200).json({
            message: result.rows?.[0]?.messages ?? []
        })
    }else{
        return res.status(200).json({
            message: [],
        })
    }
}