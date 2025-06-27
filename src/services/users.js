export const currentUser = async (userId, UserCollection) => {
  const user = await UserCollection.findById(userId).select('-password');
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }
  return user;
};