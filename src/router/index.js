import { Router } from 'express';

import usersRouter from './users.js';
import recipesRouter from './recipes.js';
import authRouter from './auth.js';
import ingredientsRouter from './ingredients.js';
// import usersRouter from './users.js';

import categoriesRouter from './categories.js';

const router = Router();

router.use('/users', usersRouter);
router.use('/recipes', recipesRouter);
router.use('/auth', authRouter);
router.use('/ingredients', ingredientsRouter);
router.use('/users', usersRouter);

router.use('/categories', categoriesRouter);

export default router;
