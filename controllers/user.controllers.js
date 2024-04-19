import { pool } from "../database.js";
import { hash_password } from "../utils/generate/generate_hash.utils.js";
import { generate_username } from "../utils/generate/generate_username.utils.js";

export const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT user_name, user_email FROM user WHERE user_status = 1 ORDER BY user_name"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT user_name, user_email FROM user WHERE id = ?",
      [req.body.id]
    );

    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { password, email } = req.body;
    let username = generate_username(email);
    let hash = await hash_password(password);
    const [result] = await pool.query(
      "INSERT INTO user (user_name, user_password, user_email, user_salt) VALUES (?, ?, ?, ?)",
      [username, hash.hash, email, hash.salt]
    );
    res.json({ id: result.insertId, username, email });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { password } = req.body;
    let hash = hash_password(password);
    const [result] = await pool.query(
      "UPDATE user SET user_password = ? WHERE user_id = ?",
      [hash, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE user SET user_status = 0 WHERE user_id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
