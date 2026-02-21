import express, { Request, Response } from 'express';
import { followVacation, unfollowVacation } from '../dal/followers';
import { verifyToken, AuthRequest } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * POST /api/followers/:vacationId
 * Follow a vacation
 */
router.post('/:vacationId', verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const vacationId = Number(req.params.vacationId);
        const userId = req.user.id;

        const success = await followVacation(userId, vacationId);

        if (success) {
            res.status(201).json({ message: 'Vacation followed successfully' });
        } else {
            // IGNORE was hit, meaning they already follow it
            res.status(200).json({ message: 'Already following this vacation' });
        }
    } catch (error: any) {
        console.error('Error following vacation:', error.message);
        res.status(500).json({ error: 'Internal server error or invalid vacation' });
    }
});

/**
 * DELETE /api/followers/:vacationId
 * Unfollow a vacation
 */
router.delete('/:vacationId', verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const vacationId = Number(req.params.vacationId);
        const userId = req.user.id;

        const success = await unfollowVacation(userId, vacationId);

        if (success) {
            res.status(200).json({ message: 'Vacation unfollowed successfully' });
        } else {
            res.status(404).json({ error: 'Not following this vacation' });
        }
    } catch (error: any) {
        console.error('Error unfollowing vacation:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
