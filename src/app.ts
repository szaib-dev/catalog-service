import express from 'express';
import type { Application, NextFunction, Request, Response } from 'express';
import logger from './config/logger.js';
import type { HttpError } from 'http-errors';

const app: Application = express();

app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/check', async (req, res, next) => {
    return res.status(200).json('success');
});

// global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(error.message, { status: error.statusCode || 500 });

    return res.status(error.statusCode || 500).json([
        {
            err: error.message,
            errStatus: error.statusCode || 500,
            location: '',
            path: '',
        },
    ]);
});

export default app;
