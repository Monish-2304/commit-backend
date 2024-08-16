import mongoose, { Schema } from 'mongoose';

const goalSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['month', 'year'],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    achieved: {
        type: Boolean,
        default: false,
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

export const Goal = mongoose.model('Goal', goalSchema);
