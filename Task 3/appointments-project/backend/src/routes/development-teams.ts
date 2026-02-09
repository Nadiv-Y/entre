import { Router, Request, Response } from 'express';
import { getAll } from '../controllers/development-teams';

const router = Router();

// GET all development teams
router.get('/', async (req: Request, res: Response) => {
    try {
        const teams = await getAll();
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).send('Error fetching development teams');
    }
});

export default router;
