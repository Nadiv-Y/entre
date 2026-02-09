import pool from '../db';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface MeetingData extends RowDataPacket {
    meeting_id: number;
    group_id: number;
    start_datetime: Date;
    end_datetime: Date;
    meeting_description: string;
    meeting_room: string;
}

export class Meeting {
    public meetingId: number | undefined; 
    public groupId: number;
    public startDatetime: string; 
    public endDatetime: string;
    public description: string;
    public room: string;

    constructor(
        groupId: number,
        startDatetime: string,
        endDatetime: string,
        description: string,
        room: string,
        meetingId?: number
    ) {
        this.groupId = groupId;
        this.startDatetime = startDatetime;
        this.endDatetime = endDatetime;
        this.description = description;
        this.room = room;
        this.meetingId = meetingId;
    }

    public async insert(): Promise<Meeting> {
        const query = `
            INSERT INTO meetings 
            (group_id, start_datetime, end_datetime, meeting_description, meeting_room)
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const values = [
            this.groupId, 
            this.startDatetime, 
            this.endDatetime, 
            this.description, 
            this.room
        ];

        const [result] = await pool.execute<ResultSetHeader>(query, values);
        
        this.meetingId = result.insertId;

        return this;
    }

    public static async getAllByGroup(groupId: number): Promise<MeetingData[]> {
        const query = 'SELECT * FROM meetings WHERE group_id = ?';
        const [rows] = await pool.execute<MeetingData[]>(query, [groupId]);
        return rows;
    }
}