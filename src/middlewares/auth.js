import createHttpError from 'http-errors';

import { User } from '../models/user.js';
import { Session } from '../models/session.js';

export const auth = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const [bearer, accessToken] = authorization.split(' ', 2);

  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    return next(
      new createHttpError.Unauthorized(
        'Please provide access token. Auth header should be of type Bearer',
      ),
    );
  }

  const session = await Session.findOne({ accessToken });

  if (session === null) {
    return next(new createHttpError.Unauthorized('Session not found'));
  }

  if (session.accessTokenValidUntil < new Date()) {
    return next(new createHttpError.Unauthorized('Access token is expired'));
  }

  const user = await User.findById(session.userId);

  if (user === null) {
    return next(new createHttpError.Unauthorized('User not found'));
  }

  req.user = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };

  next();
};
