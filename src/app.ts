import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import Factory from './factory';
import { errorMiddleware, notFound } from './middlewares';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/task', Factory.getTaskRouter());

app.all('*', notFound);

app.use(errorMiddleware);

export default app;
