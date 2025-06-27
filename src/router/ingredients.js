import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';

const router = Router();

router.get('/ingredients', ctrlWrapper(getAllIngredientsController));
