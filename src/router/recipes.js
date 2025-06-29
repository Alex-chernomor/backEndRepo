import express from 'express';
import { isValidId } from '../middlewares/isValidId.js';
import { auth } from '../middlewares/auth.js';
import {
  getAllRecipesController,
  getOwnRecipesController,
  getRecipeByIdController,
  createRecipeController,
} from '../controllers/recipes.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getAllRecipesController));

router.get('/:recipeId', isValidId, ctrlWrapper(getRecipeByIdController));

router.get('/own', auth, ctrlWrapper(getOwnRecipesController));

router.post(
  '/',
  isValidId,
  jsonParser,
  auth,
  ctrlWrapper(createRecipeController),
);

export default router;
