import { Mission } from '../models/mission.model.js';
import { Post } from '../models/post.model.js';
import { User } from '../models/user.model.js';
import {
    deleteFileFromS3,
    generatePreSignedUrls,
} from '../services/s3.service.js';

export const addPost = async (req, res) => {
    try {
        const { description, missionId, userId, imageUrls } = req.body;
        const mission = await Mission.findById(missionId);
        const user = await User.findById(userId);
        if (!mission) {
            return res.status(404).json({ message: 'Mission not found' });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (mission.status === 'gaveUp') {
            return res.status(400).json({
                message:
                    'Cannot add posts to a mission that has been given up. Start a new mission to continue.',
            });
        }

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const existingPost = await Post.findOne({
            missionId,
            userId,
            createdAt: { $gte: startOfDay, $lte: endOfDay },
        });

        if (!existingPost) {
            mission.streakCount += 1;
            await mission.save();
        }

        const post = new Post({
            description,
            streakCount: mission.streakCount,
            images: imageUrls,
            missionId,
            userId,
        });

        await post.save();

        mission.posts.push(post._id);
        await mission.save();

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getPreSignedUrls = async (req, res) => {
    try {
        const { files } = req.body;
        const urls = await generatePreSignedUrls(files);
        res.status(200).json({ urls: urls });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const editPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        const { userId, description, images } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }

        const currentDate = new Date();
        const postDate = new Date(post.createdAt);
        if (currentDate.toDateString() !== postDate.toDateString()) {
            return res.status(403).json({
                message: 'Post cannot be edited after the day it was posted',
            });
        }

        post.description = description || post.description;
        post.images = images || post.images;

        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const currentDate = new Date();
        const postDate = new Date(post.createdAt);
        if (currentDate.toDateString() !== postDate.toDateString()) {
            return res.status(403).json({
                message: 'Post cannot be deleted after the day it was posted',
            });
        }

        const fileNames = post.images?.map((url) => url.split('/').pop()) || [];

        const mission = await Mission.findById(post.missionId);
        if (mission) {
            mission.posts.pull(post._id);
            await mission.save();
        }
        if (fileNames.length > 0) await deleteFileFromS3(fileNames);

        await Post.findByIdAndDelete(postId);
        res.status(200).json({
            message: 'Post deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getAllPostsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        console.log(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const posts = await Post.find({ userId });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const posts = await Post.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            { $unwind: '$user' },
            {
                $lookup: {
                    from: 'missions',
                    localField: 'missionId',
                    foreignField: '_id',
                    as: 'mission',
                },
            },
            { $unwind: '$mission' },
            {
                $project: {
                    _id: 1,
                    upvotes: 1,
                    description: 1,
                    streakCount: 1,
                    images: 1,
                    missionName: '$mission.missionName',
                    targetDays: '$mission.targetDays',
                    missionId: 1,
                    user: {
                        _id: '$user._id',
                        userName: '$user.userName',
                        profilePicture: '$user.profilePicture',
                    },
                    comments: 1,
                    createdAt: 1,
                    updatedAt: 1,
                },
            },
        ]);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
