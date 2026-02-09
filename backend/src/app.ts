import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import teamRoutes from './routes/teams';
import meetingRoutes from './routes/meetings';

dotenv.config(); 

const server = express();

server.use(cors()); 
server.use(express.json()); 

server.use('/api', teamRoutes);
server.use('/api', meetingRoutes);

server.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.status(500).send(err.message);
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});