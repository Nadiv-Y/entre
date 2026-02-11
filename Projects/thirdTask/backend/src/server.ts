import express from "express"
import cors from "cors"
import connection from "./db.js"
import 'dotenv/config'

const app = express()
app.use(express.json())
app.use(cors())


connection.getConnection()
  .then(conn => {
    console.log("DB connected");
    conn.release();
  })
  .catch(err => console.error("DB connection failed:", err.message));


app.get("/api/teams", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM production_team")
    res.json(rows)
  } catch (err) {
    res.status(500).json(err)
  }
})

app.get("/api/meetings/:groupId", async (req, res) => {
  try {
    const groupId = req.params.groupId
    const [rows] = await connection.query(
      "SELECT * FROM meetings WHERE production_group = ? ORDER BY starting_time ASC",
      [groupId]
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json(err)
  }
})

app.post("/api/meetings", async (req, res) => {
  try {
    const { production_group, starting_time, ending_time, description, meeting_room } = req.body

    if (!production_group || !starting_time || !ending_time || !description || !meeting_room) {
      return res.status(400).send("All fields are required")
    }

    const newStart = new Date(starting_time)
    const newEnd = new Date(ending_time)

    if (newStart >= newEnd) {
      return res.status(400).send("Ending time must be after starting time")
    }

    const [existingMeetings]: any = await connection.query(
      "SELECT starting_time, ending_time FROM meetings WHERE production_group = ?",
      [production_group]
    )

    const hasOverlap = existingMeetings.some((m: any) => {
      const existingStart = new Date(m.starting_time)
      const existingEnd = new Date(m.ending_time)
      return (newStart < existingEnd && newEnd > existingStart)
    })

    if (hasOverlap) {
      return res.status(409).send("Meeting overlaps with an existing meeting for this group")
    }

    const [result] = await connection.query(
      "INSERT INTO meetings (production_group, starting_time, ending_time, description, meeting_room) VALUES (?, ?, ?, ?, ?)",
      [production_group, starting_time, ending_time, description, meeting_room]
    )

    res.status(201).json(result)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})