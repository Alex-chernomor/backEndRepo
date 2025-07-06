import express from 'express';
import { isValidId } from '../middlewares/isValidId.js';
import { auth } from '../middlewares/auth.js';
import {
  getAllRecipesController,
  getRecipeByIdController,
  createRecipeController,
} from '../controllers/recipes.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/upload.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createRecipeSchema } from '../validation/recipe.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getAllRecipesController));

router.get('/:recipeId', isValidId, ctrlWrapper(getRecipeByIdController));

router.post(
  '/',
  upload.single('thumb'),
  jsonParser,
  auth,
  // validateBody(createRecipeSchema),
  ctrlWrapper(createRecipeController),
);
export default router;
