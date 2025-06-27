import { Router } from 'express';
import recipesRouter from './recipes.js';
import authRouter from './auth.js';

const router = Router();

router.use('/api/recipes', recipesRouter);
router.use('/api/auth', authRouter);

export default router;
