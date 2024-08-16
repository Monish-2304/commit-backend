import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import connectDb from './Connections/dbconnections.js';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import passport from './config/passport.js';
import oauthRoutes from './routes/oauth.route.js';
dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:4173',
        'https://commit-org.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

passport(app);
app.use('/api', routes);
app.use('/auth', oauthRoutes);
connectDb();
app.listen(port, () => {
    console.log(port);
});
