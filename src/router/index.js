import { Router } from 'express';
import recipesRouter from './recipes.js';
import authRouter from './auth.js';
import ingredientsRouter from './ingredients.js';
import authRouter from './auth.js';
// треба буде використати цю міделвару в роуті авторизації auth
//* import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use('/api/recipes', recipesRouter);
router.use('/api/auth', authRouter);
router.use('/api/ingredients', ingredientsRouter);

export default router;
