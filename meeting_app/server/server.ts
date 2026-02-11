import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

interface Meeting {
    group_id: number;
    meeting_title: string;
    start_time: string;
    end_time: string;
    description: string;
    room_name: string;
}



app.get('/api/groups', async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query('SELECT * FROM development_groups');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching groups' });
    }
});

app.get('/api/meetings', async (req: Request, res: Response) => {
    try {
        const query = `
            SELECT 
                m.meeting_id,
                m.group_id,
                g.group_name,
                m.meeting_title,
                m.description,
                m.start_time,
                m.end_time,
                m.room_name
            FROM meetings m
            JOIN development_groups g ON m.group_id = g.group_id
            ORDER BY m.start_time ASC
        `;
        
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching meetings' });
    }
});

app.post('/api/meetings', async (req: Request, res: Response) => {
    let { group_id, new_group_name, meeting_title, start_time, end_time, description, room_name } = req.body;

    if ((!group_id && !new_group_name) || !meeting_title || !start_time || !end_time || !description) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    try {
        if (new_group_name) {
            const [existingGroup] = await db.query<RowDataPacket[]>('SELECT group_id FROM development_groups WHERE group_name = ?', [new_group_name]);
            
            if (existingGroup.length > 0) {
                group_id = existingGroup[0].group_id;
            } else {
                const [insertGroupResult] = await db.query<ResultSetHeader>('INSERT INTO development_groups (group_name) VALUES (?)', [new_group_name]);
                group_id = insertGroupResult.insertId; 
            }
        }
   
        const checkQuery = `
            SELECT * FROM meetings 
            WHERE group_id = ? 
            AND (
                ? < end_time AND 
                ? > start_time
            )
        `;
        const [existing] = await db.query<RowDataPacket[]>(checkQuery, [group_id, start_time, end_time]);

        if (existing.length > 0) {
            res.status(409).json({ error: 'Meeting overlaps with an existing one!' });
            return;
        }

        const insertQuery = `
            INSERT INTO meetings (group_id, meeting_title, start_time, end_time, description, room_name) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        const [result] = await db.query<ResultSetHeader>(insertQuery, [group_id, meeting_title, start_time, end_time, description, room_name]);
        
        res.status(201).json({ 
            message: 'Meeting created successfully', 
            meetingId: result.insertId,
            newGroupId: group_id 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error creating meeting' });
    }
});

app.delete('/api/meetings/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [result] = await db.query<ResultSetHeader>('DELETE FROM meetings WHERE meeting_id = ?', [id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Meeting not found' });
            return;
        }

        res.json({ message: 'Meeting deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error deleting meeting' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});