import { Router, Request, Response } from 'express';
import { getByTeamId, add } from '../controllers/meetings';

const router = Router();

// GET all meetings for a team
router.get('/:teamId', async (req: Request, res: Response) => {
    try {
        const teamId = Number(req.params.teamId);
        if (isNaN(teamId)) {
            res.status(400).send('Invalid team ID');
            return;
        }
        const meetings = await getByTeamId(teamId);
        res.status(200).json(meetings);
    } catch (error) {
        res.status(500).send('Error fetching meetings');
    }
});

// POST add new meeting
router.post('/', async (req: Request, res: Response) => {
    try {
        const { teamId, startTime, endTime, description, room } = req.body;
        const newMeeting = await add(teamId, startTime, endTime, description, room);
        res.status(201).json(newMeeting);
    } catch (error: any) {
        if (error.message === 'Missing required fields' || error.message === 'endTime must be after startTime' || error.message === 'Invalid date format') {
            res.status(400).send(error.message);
        } else if (error.message === 'Meeting overlaps with an existing meeting') {
            res.status(409).send(error.message);
        } else {
            console.error(error);
            res.status(500).send('Error adding meeting');
        }
    }
});

export default router;
