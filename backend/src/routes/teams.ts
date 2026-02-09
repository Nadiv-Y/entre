import express, { type Request, type Response, type NextFunction } from 'express';
import * as teamController from '../controllers/teams';

const router = express.Router();

router.get('/teams', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const teams = await teamController.getAllTeams();
        response.json(teams);
    } catch (err: any) {
        next(err); 
    }
});

export default router;