/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import config from './app/config';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

// app.use(cors({ origin: [config.frontend_url as string], credentials: true }));
app.use(cors({ origin: true, credentials: true }));

// ApplicationRoute

app.use('/api/v1', router);

// Testing Route

const welcome = async (req: Request, res: Response) => {
  res.send('Welcome to University Management Api');
};

app.get('/', welcome);

// Error Handling Middleware

app.use(globalErrorHandler);
app.use(notFound);

export default app;
