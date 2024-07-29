import { User } from '../models/user.model.js';

export const getUserDetails = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email: email })
            .populate({
                path: 'missions',
                match: { status: 'active' },
                select: 'missionName status',
            })
            .select('userName email missions');
        const userDetails = {
            userId: user._id,
            userName: user.userName,
            email: user.email,
            missions: user.missions.map((mission) => ({
                missionId: mission._id,
                missionName: mission.missionName,
            })),
        };

        res.status(200).json(userDetails);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
