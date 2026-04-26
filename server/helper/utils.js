import pool from "../config/postgreSql.js";

export const generateStockValue = () => {
    return Math.floor(Math.random() * 900) + 100;
}

export const getFriendsOnlineSocket = async (userId) => {
    const result = await pool.query(
        "SELECT u.id FROM friends f JOIN users u ON u.id = ANY(f.friend_ids) WHERE f.user_id = $1",
        [userId]
    )
    return result.rows.map(row => row.id)
}

export const addMessageToDB = async (from, to, data) => {
    await pool.query("UPDATE messages SET messages = array_append(COALESCE(messages, ARRAY[]::TEXT[]), $3) WHERE from_id = $1 AND to_id = $2", [from, to, data])
    await pool.query("UPDATE messages SET messages = array_append(COALESCE(messages, ARRAY[]::TEXT[]), $3) WHERE from_id = $1 AND to_id = $2", [to, from, {...data, self: false }])
}