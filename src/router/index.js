import { Router } from 'express';
import recipesRouter from './recipes.js';
import authRouter from './auth.js';
import ingredientsRouter from './ingredients.js';
// треба буде використати цю міделвару в роуті авторизації auth
//* import { auth } from '../middlewares/auth.js';

const router = Router();

router.use('/api/recipes', recipesRouter);
router.use('/api/auth', authRouter);
router.use('/api', ingredientsRouter);

export default router;
