import { Router } from 'express';

import { getUserById } from '../controllers/users.js';

import express from 'express';
import { currentUserController } from '../controllers/users.js';
import { auth } from '../middlewares/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/validateObjectId.js';
import {
  addFavoriteController,
  deleteFavoriteController,
  getAllFavoritesController,
} from '../controllers/recipes.js';

const router = Router();
const jsonParser = express.json();

router.get('/:userId', auth, getUserById);

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
