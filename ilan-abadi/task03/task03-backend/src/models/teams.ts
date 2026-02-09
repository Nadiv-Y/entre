import { RowDataPacket } from "mysql2";
import pool from "../db";

export interface TeamsData extends RowDataPacket{
    team_id: number,
    team_name: string
}

export class Teams {
    public static async selectAll(): Promise<TeamsData[]>{
        const query = 'SELECT * FROM meetme.dev_teams'
        const [rows] = await pool.execute<TeamsData[]>(query)
        return rows
    }
}