import { Router } from 'express';
import { getUserById } from '../controllers/users.js';

const router = Router();

router.get('/:userId', getUserById);

export default router;