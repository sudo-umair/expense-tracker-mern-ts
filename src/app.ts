import { connectToMongo } from './db';
import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user';
import expenseRouter from './routes/expense';
import cors from 'cors';

dotenv.config();
connectToMongo();

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);
app.use('/api/expense', expenseRouter);

const port = process.env.PORT ?? 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
