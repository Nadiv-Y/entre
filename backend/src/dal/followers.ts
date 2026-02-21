import pool from '../db/connection';
import { ResultSetHeader } from 'mysql2';

/**
 * Follow a vacation
 */
export const followVacation = async (userId: number, vacationId: number): Promise<boolean> => {
    try {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT IGNORE INTO Followers (user_id, vacation_id) VALUES (?, ?)`,
            [userId, vacationId]
        );
        return result.affectedRows > 0;
    } catch (error) {
        // Can fail if foreign key constraints are violated (e.g., vacation doesn't exist)
        throw error;
    }
};

/**
 * Unfollow a vacation
 */
export const unfollowVacation = async (userId: number, vacationId: number): Promise<boolean> => {
    const [result] = await pool.query<ResultSetHeader>(
        `DELETE FROM Followers WHERE user_id = ? AND vacation_id = ?`,
        [userId, vacationId]
    );
    return result.affectedRows > 0;
};
