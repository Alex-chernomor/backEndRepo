import { Router } from 'express';
import express from 'express';
import {
  addFavoriteController,
  deleteFavoriteController,
  getAllFavoritesController,
  getAllRecipesController,
  getRecipeByIdController,
} from '../controllers/recipes.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { auth } from '../middlewares/auth.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getAllRecipesController));

router.get('/:recipeId', isValidId, ctrlWrapper(getRecipeByIdController));

router.use(auth);

router.post(
  '/favorite/:recipeId',
  isValidId,
  jsonParser,
  ctrlWrapper(addFavoriteController),
);

router.delete(
  '/favorite/:recipeId',
  isValidId,
  jsonParser,
  ctrlWrapper(deleteFavoriteController),
);

router.get(
  '/favorite',
  isValidId,
  jsonParser,
  ctrlWrapper(getAllFavoritesController),
);
export default router;
