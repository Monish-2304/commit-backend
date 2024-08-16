import { Router } from 'express';
import authRoutes from '../routes/auth.route.js';
import postRoutes from '../routes/post.route.js';
import missionRoutes from '../routes/mission.route.js';
import userRoutes from '../routes/user.route.js';
const router = Router();

router.use('/auth', authRoutes);
router.use('/post', postRoutes);
router.use('/mission', missionRoutes);
router.use('/user', userRoutes);
export default router;
