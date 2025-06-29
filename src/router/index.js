import { Router } from 'express';

import usersRouter from './users.js';
import recipesRouter from './recipes.js';
import authRouter from './auth.js';
import ingredientsRouter from './ingredients.js';

const router = Router();

router.use('/users', usersRouter);
router.use('/recipes', recipesRouter);
router.use('/auth', authRouter);
router.use('/ingredients', ingredientsRouter);

export default router;
