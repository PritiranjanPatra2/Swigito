import mongoose from "mongoose";
import 'dotenv/config';

export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {dbName: process.env.DB});
    } catch (error) {
        console.log(error)
    }
}