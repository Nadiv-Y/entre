import pool from '../db/connection';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { Vacation } from '../models/Vacation';

/**
 * Fetch all vacations from the database
 */
export const getAllVacations = async (userId: number): Promise<Vacation[]> => {
    const query = `
        SELECT 
            V.*,
            (SELECT COUNT(*) FROM Followers WHERE vacation_id = V.id) AS followersCount,
            (SELECT COUNT(*) FROM Followers WHERE vacation_id = V.id AND user_id = ?) AS isFollowing
        FROM Vacations V
        ORDER BY isFollowing DESC, start_date ASC
    `;

    const [rows] = await pool.query<RowDataPacket[]>(query, [userId]);

    return rows.map(row => ({
        ...row,
        isFollowing: row.isFollowing > 0,
        followersCount: Number(row.followersCount)
    })) as Vacation[];
};

/**
 * Insert a new vacation into the database
 */
export const insertVacation = async (vacation: Omit<Vacation, 'id'>): Promise<Vacation> => {
    const { description, destination, image_name, start_date, end_date, price } = vacation;
    const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO Vacations (description, destination, image_name, start_date, end_date, price) VALUES (?, ?, ?, ?, ?, ?)',
        [description, destination, image_name, start_date, end_date, price]
    );

    return { id: result.insertId, ...vacation };
};

/**
 * Update an existing vacation in the database
 */
export const updateVacation = async (id: number, vacation: Omit<Vacation, 'id'>): Promise<boolean> => {
    const { description, destination, image_name, start_date, end_date, price } = vacation;
    const [result] = await pool.query<ResultSetHeader>(
        'UPDATE Vacations SET description = ?, destination = ?, image_name = ?, start_date = ?, end_date = ?, price = ? WHERE id = ?',
        [description, destination, image_name, start_date, end_date, price, id]
    );

    return result.affectedRows > 0;
};

/**
 * Delete a vacation from the database
 */
export const deleteVacation = async (id: number): Promise<boolean> => {
    const [result] = await pool.query<ResultSetHeader>(
        'DELETE FROM Vacations WHERE id = ?',
        [id]
    );

    return result.affectedRows > 0;
};
