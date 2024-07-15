import { Mission } from '../models/mission.model.js';
import { User } from '../models/user.model.js';

export const createMission = async (req, res) => {
    try {
        const { missionName, description, userId, targetDays, createdAt } =
            req.body;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const mission = new Mission({
            missionName,
            description,
            targetDays,
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
        const mission = await findOne(missionId);
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
        const { userId } = req.body;
        const user = await findOne(userId);
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
        const mission = await findOne(missionId);
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
