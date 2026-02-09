import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../db";

export interface MeetingsData extends RowDataPacket{
    meeting_id?: Number,
    team_id: Number,
    from: String,
    to: String,
    description: String,
    room: String
}

export class Meetings{
    public static async insertMeeting(
        team_id: number,
        from: string,
        to: string,
        description: string,
        room: string
    ):Promise<number>{
        const query = `
        INSERT INTO meetme.meetings (team_id, \`from\`, \`to\`, description, room)
        VALUES (?,?,?,?,?)`
        const [result] = await pool.execute<ResultSetHeader>(
            query,[team_id,from,to,description,room])
        return result.insertId
    }

    public static async getTeamMeetings(teamID: number):Promise<RowDataPacket[]>{
        const query = `
        SELECT m.*
        FROM meetme.meetings m
        JOIN meetme.dev_teams t
        ON m.team_id = t.team_id
        WHERE t.team_id = ?`
        const [rows] = await pool.execute<RowDataPacket[]>(query, [teamID])
        return rows
    }

    public static async meetingExists(team_id: number, newFrom: string, newTo: string):Promise<boolean>{
        const query = `
        SELECT *
        FROM meetme.meetings
        WHERE team_id = ?
        AND \`from\` < ?
        AND \`to\` > ?
        LIMIT 1`
        const [rows] = await pool.execute<RowDataPacket[]>(query,[team_id, newTo, newFrom])
        return rows.length > 0
    }
}