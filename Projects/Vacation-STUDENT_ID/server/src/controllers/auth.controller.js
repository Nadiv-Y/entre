import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const registerSchema = Joi.object({
  first_name: Joi.string().min(2).max(50).required(),
  last_name: Joi.string().min(2).max(50).required(),
  username: Joi.string().min(3).max(100).required(),
  password: Joi.string().min(6).required(),
});
export async function register(req, res) {
  try {

    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { first_name, last_name, username, password } = value;

    const [existing] = await pool.execute(
      "SELECT id FROM users WHERE username = ?", [username]
    );

    console.log(3)
    if (existing.length > 0) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      "INSERT INTO users (first_name, last_name, username, password, is_admin) VALUES (?, ?, ?, ?, ?)",
      [first_name, last_name, username, hashed, false]
    );

    const payload = { id: result.insertId, username, is_admin: false };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.status(201).json({ token, user: payload });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE username = ?", [username]
    );
    if (rows.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const payload = { id: user.id, username: user.username, is_admin: user.is_admin };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.json({ token, user: payload });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
