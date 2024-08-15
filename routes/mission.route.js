import { Router } from 'express';
import {
    createMission,
    deletemission,
    getAllMissions,
    getLayout,
    getMission,
    saveLayout,
} from '../controllers/mission.controller.js';

const router = Router();

router.post('/createMission', createMission);
router.get('/getAllMissions', getAllMissions);
router.get('/:missionId', getMission);
router.delete('/:missionId', deletemission);
router.post('/saveLayout', saveLayout);
router.post('/getLayout', getLayout);
export default router;
