import mongoose, { Schema } from 'mongoose';
import { User } from './user.model.js';
import { Post } from './post.model.js';

const missionSchema = new mongoose.Schema({
    missionName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    streakCount: {
        type: Number,
        default: 0,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: Post }],
    status: {
        type: String,
        enum: ['active', 'completed', 'failed'],
        default: 'active',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export const Mission = mongoose.model('Mission', missionSchema);
