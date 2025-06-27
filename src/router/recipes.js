import { Router } from 'express';
import { getRecipesOwnController } from '../controllers/recipes.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/own', ctrlWrapper(getRecipesOwnController));

export default router;
