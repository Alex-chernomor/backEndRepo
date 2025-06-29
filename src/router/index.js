import { Router } from 'express';
import recipesRouter from './recipes.js';
import authRouter from './auth.js';
import ingredientsRouter from './ingredients.js';

const router = Router();

router.use('/recipes', recipesRouter);
router.use('/auth', authRouter);
router.use('/ingredients', ingredientsRouter);

export default router;
