import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import config from './config';
import errorHandler from './middleware/error-handler';
import './db'; // Initialize DB connection

import developmentTeamsRouter from './routes/development-teams';
import meetingsRouter from './routes/meetings';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/teams', developmentTeamsRouter);
app.use('/api/meetings', meetingsRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Appointments Project Backend API');
});

// Error handling (must be last middleware)
app.use(errorHandler);

// Start server
app.listen(config.server.port, () => {
    console.log(`Server is running on http://localhost:${config.server.port}`);
});
