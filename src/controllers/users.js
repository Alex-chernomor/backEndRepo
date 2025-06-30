import { User } from '../models/user.js';

export const currentUserController = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id)
      .populate('favorites', 'title category thumb')
      .populate('own', 'title category thumb');

    if (!user) {
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found' });
    }

    res.json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
