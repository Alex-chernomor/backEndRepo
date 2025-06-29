
import createHttpError from 'http-errors';

import { User } from '../models/user.js';

export const getUserById = async (req, res, next) => {
  try {

    const { userId } = req.params;

    const userId = req.user._id;
    const user = await currentUser(userId, User);

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
