import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose.set('strictQuery', true);

export const connectToMongo = async () => {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));
};
