import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import connectDb from './Connections/dbconnections.js';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use('/api', routes);

connectDb();
app.listen(port, () => {
    console.log(port);
});
