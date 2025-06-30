import { User } from '../models/user.js';
// import { currentUser } from '../services/users.js';

import '../models/recipe.js';

export const currentUserController = async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('favorites')
    .populate('myRecipes');

  res.status(200).json({
    status: 200,
    message: 'User info retrieved successfully',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      favorites: user.favorites,
      myRecipes: user.myRecipes,
    },
  });
};