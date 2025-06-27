import { UsersCollection } from '../models/user.js';
// import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

export const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'This email is already in use');
  }

  payload.password = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create(payload);
};

import createHttpError from 'http-errors';
import crypto from 'node:crypto';

export async function loginUser() {
  const user = await UsersCollection.findOne({ email });
  if (user === null) {
    throw new createHttpError.Unauthorized('Email or password is incorrect');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch !== true) {
    throw new createHttpError.Unauthorized('Email or password is incorect');
  }
  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntill: new Date(Date.now() + 15 * 60 * 60 * 1000),
    refreshTokenValidUntill: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
}
