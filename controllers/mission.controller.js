import { Mission } from '../models/mission.model.js';
import { User } from '../models/user.model.js';

export const createMission = async (req, res) => {
    try {
        const {
            missionName,
            description,
            userId,
            priority,
            targetDays,
            createdAt,
        } = req.body;
        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const mission = new Mission({
            missionName,
            description,
            targetDays,
            priority,
            user: userId,
            createdAt,
        });
        await mission.save();
        user.missions.push(mission._id);
        await user.save();
        res.status(201).json(mission);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getMission = async (req, res) => {
    try {
        const { missionId } = req.params;
        const mission = await User.findById(missionId);
        if (!mission) {
            return res.status(404).json({ message: 'Mission not found' });
        }
        res.status(200).json({ mission: mission });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getAllMissions = async (req, res) => {
    try {
        const { userId } = req.query;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const missions = await Mission.find({ user: userId });
        res.status(200).json(missions);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const deletemission = async (req, res) => {
    try {
        const missionId = req.params;
        const mission = await User.findOne(missionId);
        if (!mission) {
            return res.status(404).json({ message: 'Mission not found' });
        }
        mission.status = 'gaveUp';
        await mission.save();

        res.status(200).json({ message: 'Mission status updated to gaveUp' });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const saveLayout = async (req, res) => {
    try {
        const { userId, layout } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.layout = layout;
        await user.save();

        res.status(200).json({ message: 'Layout saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving layout', error });
    }
};

export const getLayout = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);
        const layout = user.layout.map((item) => ({
            i: item.i,
            x: Number(item.x), 
            y: Number(item.y),
            w: Number(item.w),
            h: Number(item.h),
        }));
        res.status(200).json({ layout: layout });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching layout', error });
    }
};
