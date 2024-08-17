import dotenv from 'dotenv';
import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

dotenv.config();
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Password is invalid' });
        }

        const token = generateToken(res, user._id, user.email);

        res.json({
            user: { userId:user._id,email: user.email, userName: user.userName },
            token,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
};

export const validateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user, message: 'User validated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Authentication failed' });
    }
};

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({
            $or: [{ email: email }, { userName: username }],
        });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({
            userName: username,
            email,
            password: hashedPassword,
        });
        await user.save();
        const token = generateToken(res, user._id, user.email);
        res.json({
            user: {userId:user._id, email: user.email, userName: user.userName },
            token,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};

export const logoutUser = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0),
        httpOnly: true,
        secure: true,
    });
    res.status(200).send({ message: 'Logged out successfully' });
};
