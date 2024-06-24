import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const connectDb = () => {
    return mongoose.connect(process.env.MONGO_CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });
};

export default connectDb;
