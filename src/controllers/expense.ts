import { type RequestHandler } from 'express';
import User, { type IUser } from '../models/User';
import Expense, { type IExpense } from '../models/Expense';
import { StatusCodes } from 'http-status-codes';

export const CreateExpense: RequestHandler = async (req, res) => {
  try {
    const { title, amount, description, date, email, token } =
      req.body as IExpense & IUser;

    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: 'User not found' });
        }
        user
          .verifyAuthToken(token)
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: 'Wrong token' });
            }
            const newExpense = new Expense({
              title,
              amount,
              description,
              date,
              email,
            });
            newExpense
              .save()
              .then((expense) => {
                res.status(StatusCodes.CREATED).json({
                  message: 'Expense created',
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
      });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export const GetExpenses: RequestHandler = async (req, res) => {
  try {
    const { email, token } = req.body as IUser;
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: 'User not found' });
        }
        user
          .verifyAuthToken(token)
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: 'Wrong token' });
            }
            Expense.find({ email })
              .then((expenses) => {
                res.status(StatusCodes.OK).json({
                  message: 'Expenses fetched',
                  expenses,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                  message: err,
                });
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              message: err,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
      });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export const DeleteExpense: RequestHandler = async (req, res) => {
  try {
    const { email, token, _id } = req.body as IUser & IExpense;
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: 'User not found' });
        }
        user
          .verifyAuthToken(token)
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: 'Wrong token' });
            }
            Expense.findOne({ _id })
              .then((expense) => {
                if (!expense) {
                  return res
                    .status(StatusCodes.NOT_FOUND)
                    .json({ message: 'Expense not found' });
                }
                expense
                  .delete()
                  .then(() => {
                    res.status(StatusCodes.OK).json({
                      message: 'Expense deleted',
                    });
                  })
                  .catch((err: Error) => {
                    console.log(err);
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                      message: err,
                    });
                  });
              })
              .catch((err: Error) => {
                console.log(err);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                  message: err,
                });
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              message: err,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
      });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export const UpdateExpense: RequestHandler = async (req, res) => {
  try {
    const { email, token, _id, title, amount, description, date } =
      req.body as IUser & IExpense;
    User.findOne({
      email,
    })
      .then((user) => {
        if (!user) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: 'User not found' });
        }
        user
          .verifyAuthToken(token)
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: 'Wrong token' });
            }
            Expense.findOne({ _id })
              .then((expense) => {
                if (!expense) {
                  return res
                    .status(StatusCodes.NOT_FOUND)
                    .json({ message: 'Expense not found' });
                }
                expense.title = title;
                expense.amount = amount;
                expense.description = description;
                expense.date = date;
                expense
                  .save()
                  .then(() => {
                    res.status(StatusCodes.OK).json({
                      message: 'Expense updated',
                    });
                  })
                  .catch((err: Error) => {
                    console.log(err);
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                      message: err,
                    });
                  });
              })
              .catch((err: Error) => {
                console.log(err);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                  message: err,
                });
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              message: err,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
      });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};
