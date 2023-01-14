import { RequestHandler } from 'express';
import User, { IUser } from '../models/User';
import { StatusCodes } from 'http-status-codes';

export const Register: RequestHandler = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, name } = req.body as IUser;
    User.findOne({ email })
      .then((user) => {
        if (user) {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: 'Email already taken!' });
        } else {
          const newUser = new User({ email, password, name });
          newUser.encryptPassword(password);
          newUser
            .save()
            .then((user) => {
              res.status(StatusCodes.CREATED).json({
                message: 'Account created!',
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: err,
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: err,
        });
      });
  } catch (err: any) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err,
    });
  }
};

export const Login: RequestHandler = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body as IUser;
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: 'User not found!' });
        }
        user
          .comparePassword(password)
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: 'Wrong password!' });
            }
            user.generateAuthToken().then(() => {
              res.status(StatusCodes.OK).json({
                message: `Welcome back ${user.name}!`,
                user,
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
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: err,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err,
    });
  }
};
