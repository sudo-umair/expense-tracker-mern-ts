import { Router } from 'express';
import {
  CreateExpense,
  GetExpenses,
  DeleteExpense,
  UpdateExpense,
} from '../controllers/expense';

const expenseRouter = Router();

expenseRouter.post('/create', CreateExpense);
expenseRouter.post('/get', GetExpenses);
expenseRouter.post('/delete', DeleteExpense);
expenseRouter.post('/update', UpdateExpense);

export default expenseRouter;
