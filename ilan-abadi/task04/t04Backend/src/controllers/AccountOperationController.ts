import { Request, Response } from 'express';
import AccountOperation from '../models/AccountOperation';

export const getOperations = async (req: Request, res: Response) => {
    try {
        const { accountNumber } = req.params;
        const operations = await AccountOperation.find({ accountNumber })
            .sort({ date: -1 }); // Newest first

        res.status(200).json(operations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch operations' });
    }
};

export const createOperation = async (req: Request, res: Response) => {
    try {
        const { accountNumber, type, amount, interest, payments } = req.body;

        const newOperation = new AccountOperation({
            accountNumber,
            type,
            amount,
            interest,
            payments
        });

        await newOperation.save();
        res.status(201).json({ message: 'Operation recorded successfully' });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: error.message });
        } else {
            console.error('Operation error:', error);
            res.status(500).json({ error: 'Failed to record operation' });
        }
    }
};
