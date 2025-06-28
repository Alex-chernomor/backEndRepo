import express from 'express';
import { isValidId } from '../middlewares/validateObjectId.js';
import { auth } from '../middlewares/auth.js';
import { Router } from 'express';
import {
  addFavoriteController,
  deleteFavoriteController,
  getAllFavoritesController,
  getAllRecipesController,
  getOwnRecipesController,
  getRecipeByIdController,
} from '../controllers/recipes.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getAllRecipesController));

router.get('/:recipeId', isValidId, ctrlWrapper(getRecipeByIdController));

router.get('/own', ctrlWrapper(getOwnRecipesController));

router.post(
  '/favorite/:recipeId',
  isValidId,
  jsonParser,
  auth,
  ctrlWrapper(addFavoriteController),
);

router.delete(
  '/favorite/:recipeId',
  isValidId,
  jsonParser,
  auth,
  ctrlWrapper(deleteFavoriteController),
);

router.get(
  '/favorite',
  jsonParser,
  auth,
  ctrlWrapper(getAllFavoritesController),
);
export default router;
