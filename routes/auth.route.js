import { Router } from 'express';
import {
    loginUser,
    logoutUser,
    registerUser,
    validateUser,
} from '../controllers/auth.controller.js';
import authenticateToken from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.get('/validate', authenticateToken, validateUser);

export default router;
