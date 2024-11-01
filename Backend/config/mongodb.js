// This is how we can connect mongodb
import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("DB connected");   
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
}
export default connectDB;