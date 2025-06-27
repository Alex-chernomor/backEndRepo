import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { logoutUserController } from '../controllers/auth.js';

const router = Router();

router.post('/logout', ctrlWrapper(logoutUserController));

export default router;
