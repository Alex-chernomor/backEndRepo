import { Router } from 'express';
import { getAllRecipesController } from '../controllers/recipes.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getAllRecipesController));

export default router;
