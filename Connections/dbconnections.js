import mongoose from "mongoose";

const uri = "mongodb+srv://srutisagar007:3MT9zRAQ2RKdDMd5@cluster0.qwhouyu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDb = () => {
    return mongoose.connect(uri, {
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
