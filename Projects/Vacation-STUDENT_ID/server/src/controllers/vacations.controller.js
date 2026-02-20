import pool from "../db.js";
import { getIo } from "../socket.js";

// GET /vacations  — returns all vacations with isFollowed flag for current user
export async function getAllVacations(req, res) {
  try {
    const userId = req.user.id;
    const [rows] = await pool.execute(
      `SELECT v.*,
        EXISTS(
          SELECT 1 FROM users_vacations uv
          WHERE uv.vacation_id = v.id AND uv.user_id = ?
        ) AS isFollowed
      FROM vacations v
      ORDER BY
        isFollowed DESC,
        v.start_date ASC`,
      [userId]
    );
    // Cast isFollowed to boolean
    const data = rows.map(r => ({ ...r, isFollowed: Boolean(r.isFollowed) }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET /vacations/report  — vacations with at least 1 follower (admin only)
export async function getReport(req, res) {
  try {
    const [rows] = await pool.execute(
      "SELECT destination, follower_count FROM vacations WHERE follower_count > 0 ORDER BY follower_count DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// POST /vacations  (admin only)
export async function createVacation(req, res) {
  try {
    const { destination, description, start_date, end_date, price } = req.body;
    if (!destination || !description || !start_date || !end_date || !price || !req.file) {
      return res.status(400).json({ message: "All fields including image are required" });
    }
    const image_filename = req.file.filename;
    console.log(req.file);
    const [result] = await pool.execute(
      "INSERT INTO vacations (destination, description, start_date, end_date, price, image_filename) VALUES (?,?,?,?,?,?)",
      [destination, description, start_date, end_date, price, image_filename]
    );
    const [rows] = await pool.execute("SELECT * FROM vacations WHERE id = ?", [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// PUT /vacations/:id  (admin only) — emits socket event after update
export async function updateVacation(req, res) {
  try {
    const { id } = req.params;
    const { destination, description, start_date, end_date, price } = req.body;
    const image_filename = req.file ? req.file.filename : null;

    if (image_filename) {
      await pool.execute(
        "UPDATE vacations SET destination=?, description=?, start_date=?, end_date=?, price=?, image_filename=? WHERE id=?",
        [destination, description, start_date, end_date, price, image_filename, id]
      );
    } else {
      await pool.execute(
        "UPDATE vacations SET destination=?, description=?, start_date=?, end_date=?, price=? WHERE id=?",
        [destination, description, start_date, end_date, price, id]
      );
    }

    const [rows] = await pool.execute("SELECT * FROM vacations WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Vacation not found" });

    // 🔴 Real-time: broadcast the updated vacation to ALL connected clients
    getIo().emit("vacationUpdated", rows[0]);

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// DELETE /vacations/:id  (admin only)
export async function deleteVacation(req, res) {
  try {
    const { id } = req.params;
    const [result] = await pool.execute("DELETE FROM vacations WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Vacation not found" });
    res.json({ message: "Vacation deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
