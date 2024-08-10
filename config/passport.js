import passport from 'passport';
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const passportConfig = (app) => {
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 3,
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
            },
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/auth/google/callback',
                prompt: 'select_account',
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    let user = await User.findOne({
                        email: profile.emails[0].value,
                    });

                    if (!user) {
                        const salt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(
                            Math.random().toString(36).slice(-8),
                            salt
                        );
                        user = new User({
                            userName: profile.displayName,
                            email: profile.emails[0].value,
                            password: hashedPassword,
                            profilePicture: profile.photos[0].value,
                        });

                        await user.save();
                    }

                    done(null, user);
                } catch (error) {
                    console.log('this is the error', error);
                }
            }
        )
    );
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};

export default passportConfig;
