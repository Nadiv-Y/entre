import pool from '../db';
import { RowDataPacket } from 'mysql2';

export interface DevelopmentTeamData extends RowDataPacket {
    id: number;
    name: string;
}

export class DevelopmentTeam {
    public id: number;
    public name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public static async selectAll(): Promise<DevelopmentTeamData[]> {
        const query = 'SELECT * FROM development_teams';
        const [rows] = await pool.execute<DevelopmentTeamData[]>(query);
        return rows;
    }
}
