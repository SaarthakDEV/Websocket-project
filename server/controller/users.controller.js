import pool from "../config/postgreSql.js";

export const getFriends = async (req, res) => {
  const { id: userId } = req.params;
  const result = await pool.query(
    `SELECT u.id, u.name
     FROM friends f
     JOIN users u ON u.id = ANY(f.friend_ids)
     WHERE f.user_id = $1`,
    [userId]
  );
  return res.status(200).json({ friends: result.rows });
};

export const getUsers = async (req, res) => {
  const search = req.query.search;
  const result = await pool.query(
    "SELECT id, name FROM users WHERE name ILIKE $1",
    [`%${search}%`],
  );
  if (result.rowCount > 0) {
    return res.status(200).json({
      users: result.rows,
    });
  }else{
    return res.status(200).json({
      users: [],
    });
  }
};

export const addFriends = async (req, res) => {
  const { friend_id } = req.body;
  const { id } = req.params;

  if (!friend_id) {
    return res.status(400).json({ message: "friend_id is required" });
  }

  if (String(id) === String(friend_id)) {
    return res.status(400).json({ message: "Cannot add yourself as a friend" });
  }

  // Check if friend_id is already in the list
  const existing = await pool.query(
    "SELECT friend_ids FROM friends WHERE user_id = $1",
    [id]
  );

  if (existing.rowCount === 0) {
    // No row yet — create one with this friend
    await pool.query(
      "INSERT INTO friends(user_id, friend_ids) VALUES($1, ARRAY[$2]::INT[])",
      [id, friend_id]
    );
  } else {
    const friendIds = existing.rows[0].friend_ids || [];
    if (friendIds.includes(Number(friend_id))) {
      return res.status(409).json({ message: "Already friends" });
    }
    await pool.query(
      "UPDATE friends SET friend_ids = array_append(friend_ids, $1) WHERE user_id = $2",
      [friend_id, id]
    );
    await pool.query(
      "UPDATE friends SET friend_ids = array_append(friend_ids, $2) WHERE user_id = $1",
      [friend_id, id]
    );
  }

  return res.status(200).json({ message: "Friend added successfully" });
};

export const isUserOnline = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT socket_id FROM users WHERE id = $1", [id]);
  const online = result.rows[0]?.socket_id?.length > 0;
  return res.status(200).json({ online });
};