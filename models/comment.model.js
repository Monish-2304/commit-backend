import mongoose, { Schema } from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Comment = mongoose.model('Comment', commentSchema);
