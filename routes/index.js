import { Router } from 'express';
import authRoutes from '../routes/auth.route.js';
import postRoutes from '../routes/post.route.js';
const router = Router();

router.use('/auth', authRoutes);
router.use('/post', postRoutes);
export default router;
