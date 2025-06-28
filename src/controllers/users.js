import { currentUser } from '../services/users.js';
import { UserCollection } from '../models/users.js';

export const currentUserController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await currentUser(userId, UserCollection);

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
