import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import operationRoutes from './routes/AccountOperationRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3013;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/operations', operationRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Bank Account API is running...');
});

// Start Server
const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer();
