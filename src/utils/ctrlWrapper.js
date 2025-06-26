export const ctrlWrapper = (controller) => {
  return async (req, resp, next) => {
    try {
      await controller(req, resp, next);
    } catch (error) {
      next(error);
    }
  };
};
