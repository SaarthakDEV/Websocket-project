import pool from "../config/postgreSql.js"

export const getFriends = async (req,res) => {
    const { id: userId } = req.params;
    const result = await pool.query("SELECT friend_ids FROM friends WHERE user_id = $1", [userId]);
    console.log(result.rowCount)
    if(result.rowCount === 0){
        // No row
        await pool.query("INSERT INTO friends VALUES($1, ARRAY[]::INT[])", [userId])
        return res.status(200).json({
                friends: []
            })
    }else{
        if(!result.rows[0].friend_ids){
            // no friends
            return res.status(200).json({
                friends: []
            })
        }else{
            return res.status(200).json({
                friends: result.rows[0].friend_ids
            })
        }
    }
}