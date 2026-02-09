import pool from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface MeetingData extends RowDataPacket {
    id: number;
    teamId: number;
    startTime: Date;
    endTime: Date;
    description: string;
    room: string;
}

export class Meeting {
    public id?: number;
    public teamId: number;
    public startTime: Date;
    public endTime: Date;
    public description: string;
    public room: string;

    constructor(
        teamId: number,
        startTime: Date,
        endTime: Date,
        description: string,
        room: string,
        id?: number
    ) {
        this.teamId = teamId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.description = description;
        this.room = room;
        this.id = id;
    }

    public async insert(): Promise<Meeting> {
        const query = `
      INSERT INTO meetings (teamId, startTime, endTime, description, room)
      VALUES (?, ?, ?, ?, ?)
    `;
        const values = [this.teamId, this.startTime, this.endTime, this.description, this.room];

        try {
            const [result] = await pool.execute<ResultSetHeader>(query, values);
            this.id = result.insertId;
            return this;
        } catch (error) {
            console.error('Error executing meeting insert query:', error);
            throw error;
        }
    }

    public static async selectByTeamId(teamId: number): Promise<MeetingData[]> {
        const query = 'SELECT * FROM meetings WHERE teamId = ? ORDER BY startTime ASC';
        const [rows] = await pool.execute<MeetingData[]>(query, [teamId]);
        return rows;
    }

    public static async hasOverlap(teamId: number, startTime: Date, endTime: Date): Promise<boolean> {
        // Overlap logic: NOT (endTime <= newStart OR startTime >= newEnd)
        // Equivalent to: startTime < newEnd AND endTime > newStart
        const query = `
            SELECT COUNT(*) as count 
            FROM meetings 
            WHERE teamId = ? 
            AND startTime < ? 
            AND endTime > ?
        `;
        const [rows] = await pool.execute<RowDataPacket[]>(query, [teamId, endTime, startTime]);
        return rows[0].count > 0;
    }
}
