import express, { Request, Response } from 'express';
import { getAllVacations, insertVacation, updateVacation, deleteVacation } from '../dal/vacations';
import { verifyToken, verifyAdmin, AuthRequest } from '../middlewares/authMiddleware';
import { upload } from '../utils/upload';
import { getIO } from '../utils/socket';

const router = express.Router();

// GET all vacations
router.get('/', verifyToken, async (req: AuthRequest, res: Response) => {
    try {
        // req.user is populated by verifyToken
        const userId = req.user.id;
        const vacations = await getAllVacations(userId);
        res.json(vacations);
    } catch (error: any) {
        console.error('Error fetching vacations:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST to create a vacation (Admin only)
router.post('/', verifyToken, verifyAdmin, upload.single('image'), async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'Image file is required' });
            return;
        }

        const { description, destination, start_date, end_date, price } = req.body;
        const image_name = req.file.filename;

        // Perform basic validations
        if (!description || !destination || !start_date || !end_date || !price) {
            res.status(400).json({ error: 'All fields are mandatory' });
            return;
        }

        const insertedVacation = await insertVacation({
            description,
            destination,
            image_name,
            start_date,
            end_date,
            price: Number(price)
        });

        // Notify all connected clients about the new vacation
        getIO().emit('vacation_added', insertedVacation);

        res.status(201).json(insertedVacation);
    } catch (error: any) {
        console.error('Error inserting vacation:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT to update a vacation (Admin only)
router.put('/:id', verifyToken, verifyAdmin, upload.single('image'), async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const { description, destination, start_date, end_date, price } = req.body;
        let image_name = req.body.existing_image; // Admin might not update image, so they provide existing name

        // If a new image was uploaded
        if (req.file) {
            image_name = req.file.filename;

            // Note: In a production environment, you would delete the old physical image file here
            // using fs.unlinkSync to save space!
        }

        // Perform basic validations
        if (!description || !destination || !start_date || !end_date || !price || !image_name) {
            res.status(400).json({ error: 'All fields are mandatory' });
            return;
        }

        const vacationData = {
            description,
            destination,
            image_name,
            start_date,
            end_date,
            price: Number(price)
        };

        const isUpdated = await updateVacation(id, vacationData);

        if (!isUpdated) {
            res.status(404).json({ error: 'Vacation not found' });
            return;
        }

        // Notify all connected clients about the update
        getIO().emit('vacation_updated', { id, ...vacationData });

        res.json({ message: 'Vacation updated successfully' });
    } catch (error: any) {
        console.error('Error updating vacation:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE a vacation (Admin only)
router.delete('/:id', verifyToken, verifyAdmin, async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);

        // Note: In production you should fetch the vacation first and delete its physical image file

        const isDeleted = await deleteVacation(id);

        if (!isDeleted) {
            res.status(404).json({ error: 'Vacation not found' });
            return;
        }

        // Notify all connected clients about the deletion
        getIO().emit('vacation_deleted', id);

        res.json({ message: 'Vacation deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting vacation:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
