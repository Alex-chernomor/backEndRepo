import createHttpError from 'http-errors';
import { SessionsCollection } from '../models/session.js';
import { UsersCollection } from '../models/User.js';
import jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils/getEnvVar.js';

export const auth = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  const session = await SessionsCollection.findOne({ accessToken: token });

  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
  }

  const user = await UsersCollection.findById(session.userId);

  if (!user) {
    next(createHttpError(401));
    return;
  }

  req.user = { id: user._id, name: user.name };

  next();
};

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Please provide Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = getEnvVar('JWT_SECRET');

    let decoded;
    try {
      decoded = jwt.verify(token, jwtSecret);
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const user = await UserCollection.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Session not found' });
    }

    req.user = {
      id: user._id,
      email: user.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};