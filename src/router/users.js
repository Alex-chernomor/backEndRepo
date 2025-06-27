import { Router } from 'express';
import { currentUserController } from '../controllers/users.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.get('/current', auth, currentUserController);

export default router;