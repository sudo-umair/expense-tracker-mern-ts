import { Schema, Model, model, type ObjectId } from 'mongoose';

export interface IExpense {
  _id: ObjectId;
  title: string;
  amount: number;
  date: Date;
  description: string;
  email: string;
}

type UserModel = Model<IExpense, {}, {}>;

const expenseSchema = new Schema<IExpense, UserModel>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
});

export default model<IExpense, UserModel>('Expense', expenseSchema);
