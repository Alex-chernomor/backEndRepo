import { UserCollection } from '../models/users.js';
import createHttpError from 'http-errors';

export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await UserCollection.findById(userId).select('-password');

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    res.json({
      status: 200,
      message: 'User found',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};