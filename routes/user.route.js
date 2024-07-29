import { Router } from 'express';
import { getUserDetails } from '../controllers/user.controller.js';

const router = Router();

router.get('/:email', getUserDetails);

export default router;
