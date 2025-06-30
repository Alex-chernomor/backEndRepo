import { Router } from 'express';

import { getUserById } from '../controllers/users.js';

// import express from 'express';
import { auth } from '../middlewares/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  addFavoriteController,
  deleteFavoriteController,
  getAllFavoritesController,
  getOwnRecipesController,
} from '../controllers/recipes.js';

const router = Router();

router.get('/own', auth, ctrlWrapper(getOwnRecipesController));

router.post(
  '/favorites/:recipeId',
  auth,
  isValidId,
  ctrlWrapper(addFavoriteController),
);

router.delete(
  '/favorites/:recipeId',
  auth,
  isValidId,
  ctrlWrapper(deleteFavoriteController),
);

router.get('/favorites', auth, ctrlWrapper(getAllFavoritesController));

router.get('/:userId', auth, getUserById);

export default router;
