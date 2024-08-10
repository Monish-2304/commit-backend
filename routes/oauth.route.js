import { Router } from 'express';
import passport from 'passport';
import generateToken from '../utils/generateToken.js';

const router = Router();

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    generateToken(res, req.user._id, req.user.email);
    res.redirect(`${process.env.CLIENT_URL}home`);
});
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Logout failed.');
        }
        req.session.destroy((err) => {
            if (err) {
                return res
                    .status(500)
                    .send('Could not log out, please try again.');
            }
            res.clearCookie('connect.sid', { path: '/', httpOnly: true });
            res.clearCookie('jwtToken');
            res.status(200).json({ message: 'Logged out succesfully' });
        });
    });
});

export default router;
