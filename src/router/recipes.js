import express from 'express';
import { isValidId } from '../middlewares/validateObjectId.js';
import { auth } from '../middlewares/auth.js';
import {
  addFavoriteController,
  deleteFavoriteController,
  getAllFavoritesController,
  getAllRecipesController,
  getOwnRecipesController,
  getRecipeByIdController,
  createRecipeController,
} from '../controllers/recipes.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { authenticate } from '../middlewares/authenticate.js';

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

router.post(
  '/favorites/:recipeId',
  isValidId,
  jsonParser,
  auth,
  ctrlWrapper(addFavoriteController),
);

router.delete(
  '/favorites/:recipeId',
  isValidId,
  jsonParser,
  auth,
  ctrlWrapper(deleteFavoriteController),
);

router.get(
  '/favorites',
  jsonParser,
  auth,
  ctrlWrapper(getAllFavoritesController),
);

export default router;
