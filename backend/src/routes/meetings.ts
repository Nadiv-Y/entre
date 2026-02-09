import express, { type Request, type Response, type NextFunction } from 'express';
import * as meetingController from '../controllers/meetings';

const router = express.Router();

router.get('/meetings/:groupId', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const groupId = Number(request.params['groupId']);
        const meetings = await meetingController.getMeetingsByGroup(groupId);
        response.json(meetings);
    } catch (err: any) {
        next(err);
    }
});

router.post('/meetings', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const newMeeting = await meetingController.addMeeting(request.body);
        response.status(201).json(newMeeting); 
    } catch (err: any) {
        next(err);
    }
});

export default router;