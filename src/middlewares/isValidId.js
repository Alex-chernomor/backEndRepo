import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, resp, next) => {
  const { recipeId } = req.params;

  if (isValidObjectId(recipeId) !== true) {
    return next(createHttpError.BadRequest('Id should be an ObjectId'));
  }
  next();
};
