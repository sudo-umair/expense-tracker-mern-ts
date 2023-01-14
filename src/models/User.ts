import { Model, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export interface IUser {
  name: string;
  email: string;
  password: string;
  token: string;
}

interface IUserMethods {
  encryptPassword: (password: string) => Promise<void>;
  comparePassword: (password: string) => Promise<boolean>;
  generateAuthToken: () => Promise<string>;
  verifyAuthToken: (token: string) => Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

userSchema.methods.encryptPassword = async function (password: string) {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  user.password = hash;
  await user.save();
};

userSchema.methods.comparePassword = async function (password: string) {
  const user = this;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string);
  user.token = token;
  await user.save();
};

userSchema.methods.verifyAuthToken = async function (token: string) {
  const user = this;
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  const { _id } = decoded as { _id: string };
  if (_id === user._id.toString()) {
    return true;
  }
  return false;
};

export default model<IUser, UserModel>('User', userSchema);
