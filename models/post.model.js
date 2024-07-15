import mongoose, { Schema } from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        upvotes: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            required: true,
        },
        streakCount: {
            type: Number,
            default: 0,
        },
        images: {
            type: [String],
            default: [],
        },
        missionId: {
            type: Schema.Types.ObjectId,
            ref: 'Mission',
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        comments: [
            {
                user: { type: Schema.Types.ObjectId, ref: 'User' },
                comment: { type: String },
                parentComment: {
                    type: Schema.Types.ObjectId,
                    ref: 'Comment',
                    default: null,
                },
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export const Post = mongoose.model('Post', postSchema);
