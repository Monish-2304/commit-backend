import { Router } from 'express';
import {
    createMission,
    deletemission,
    getAllMissions,
    getMission,
} from '../controllers/mission.controller.js';

const router = Router();

router.post('/createMission', createMission);
router.get('/getAllMissions', getAllMissions);
router.get('/:missionId', getMission);
router.delete('/:missionId', deletemission);

export default router;
