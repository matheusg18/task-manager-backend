import express from 'express';
import cors from 'cors';
import 'express-async-errors';

const app = express();

app.use(express.json());
app.use(cors());

export default app;
