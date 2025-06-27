import jwt from 'jsonwebtoken';
import { UserCollection } from '../models/users.js';
import { getEnvVar } from '../utils/getEnvVar.js';

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