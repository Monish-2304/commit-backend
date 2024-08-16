import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: '',
    },
    profilePicture: {
        type: String,
        default: '',
    },
    isAuth: {
        type: Boolean,
    },
    missions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Mission',
        },
    ],
    layout: { type: Array, default: [] },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export const User = mongoose.model('User', userSchema);
