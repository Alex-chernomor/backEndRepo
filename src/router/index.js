import { Router } from 'express';
import recipesRouter from './recipes.js';

const router = Router();

router.use('/api/recipes', recipesRouter);

export default router;
