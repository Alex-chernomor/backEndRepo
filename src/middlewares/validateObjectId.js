import createHttpError from 'http-errors';
import {isValidObjectId} from 'mongoose';

export function isValidId(req, res, next) {
  if (!isValidObjectId(req.params.contactId)) {
    return next(createHttpError.BadRequest('ID should be an ObjectId'));
  }

  next();
}