import { UsersCollection } from '../models/user.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'This email is already in use');
  }

  payload.password = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create(payload);
};
