import pool from '../db';
import type { RowDataPacket } from 'mysql2';

export interface TeamData extends RowDataPacket {
    group_id: number;
    group_name: string;
}

export class Team {
    public static async getAll(): Promise<TeamData[]> {
        const query = 'SELECT * FROM development_teams';
        const [rows] = await pool.execute<TeamData[]>(query);
        return rows;
    }
}