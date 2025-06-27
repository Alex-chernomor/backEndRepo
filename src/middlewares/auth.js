import createHttpError from 'http-errors';

import { User } from '../models/user.js';

import { Session } from '../models/session.js';

export async function auth(req, res, next) {
  const { authorization } = req.headers;

  if (typeof authorization !== 'string') {
    return next(
      new createHttpError.Unauthorized('Please provide access token'),
    );
  }

  const [bearer, accessToken] = authorization.split(' ', 2);

  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    return next(
      new createHttpError.Unauthorized('Please provide access token'),
    );
  }

  const session = await Session.findOne({ accessToken });

  if (session === null) {
    return next(new createHttpError.Unauthorized('Session not found'));
  }

  if (session.accessTokenValidUntil < new Date()) {
    return next(new createHttpError.Unauthorized('Access token is expired'));
  }

  const user = await User.findOne({ _id: session.userId });

  if (user === null) {
    return next(new createHttpError.Unauthorized('User not found'));
  }

  req.user = { _id: user._id, name: user.name };

  next();
}
