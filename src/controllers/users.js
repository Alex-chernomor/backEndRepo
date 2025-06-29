import { User } from '../models/user.js';
import { currentUser } from '../services/users.js';

export const currentUserController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await currentUser(userId, User);

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
