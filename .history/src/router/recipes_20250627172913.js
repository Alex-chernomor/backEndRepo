import { Router } from 'express';
import {
  getAllRecipesController,
  createRecipeController,
} from '../controllers/recipes.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/', ctrlWrapper(getAllRecipesController));

router.post('/', authenticate, ctrlWrapper(createRecipeController));

export default router;
