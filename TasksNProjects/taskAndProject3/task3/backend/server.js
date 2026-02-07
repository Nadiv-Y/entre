require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.get("/api/teams", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT team_id, team_name FROM development_teams ORDER BY team_name"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/teams/:teamId/meetings", async (req, res) => {
  const teamId = Number(req.params.teamId);

  if (!Number.isInteger(teamId)) {
    return res.status(400).json({ message: "Invalid team id" });
  }

  try {
    const [rows] = await pool.query(
      `SELECT meeting_id, start_time, end_time, description, room
       FROM meetings
       WHERE team_id = ?
       ORDER BY start_time`,
      [teamId]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/api/meetings", async (req, res) => {
  const { team_id, start_time, end_time, description, room } = req.body;

  if (!team_id || !start_time || !end_time || !description || !room) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const start = new Date(start_time);
  const end = new Date(end_time);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({ message: "Invalid start_time or end_time" });
  }
  if (end <= start) {
    return res.status(400).json({ message: "End time must be after start time" });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO meetings (team_id, start_time, end_time, description, room)
       VALUES (?, ?, ?, ?, ?)`,
      [team_id, start_time, end_time, description, room]
    );

    res.status(201).json({
      meeting_id: result.insertId,
      team_id,
      start_time,
      end_time,
      description,
      room
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
