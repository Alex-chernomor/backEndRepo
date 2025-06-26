import { Router } from 'express';
import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';

const router = Router();
const jsonParser = express.json();

router.get('/ingredients', ctrlWrapper(getAllIngredientsController));
