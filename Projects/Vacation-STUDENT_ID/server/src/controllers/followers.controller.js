import pool from "../db.js";

// POST /vacations/:id/follow
export async function followVacation(req, res) {
  try {
    const userId = req.user.id;
    // Admins cannot follow
    if (req.user.is_admin) {
      return res.status(403).json({ message: "Admins cannot follow vacations" });
    }
    const { id: vacationId } = req.params;

    await pool.execute(
      "INSERT IGNORE INTO users_vacations (user_id, vacation_id) VALUES (?, ?)",
      [userId, vacationId]
    );
    // Sync follower_count from junction table
    await pool.execute(
      "UPDATE vacations SET follower_count = (SELECT COUNT(*) FROM users_vacations WHERE vacation_id = ?) WHERE id = ?",
      [vacationId, vacationId]
    );
    res.json({ message: "Followed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// DELETE /vacations/:id/follow
export async function unfollowVacation(req, res) {
  try {
    const userId = req.user.id;
    const { id: vacationId } = req.params;

    await pool.execute(
      "DELETE FROM users_vacations WHERE user_id = ? AND vacation_id = ?",
      [userId, vacationId]
    );
    await pool.execute(
      "UPDATE vacations SET follower_count = (SELECT COUNT(*) FROM users_vacations WHERE vacation_id = ?) WHERE id = ?",
      [vacationId, vacationId]
    );
    res.json({ message: "Unfollowed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
