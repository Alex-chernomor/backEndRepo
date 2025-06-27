export const validateBody = (schema) => async (req, resp, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: true });
    next();
  } catch (err) {
    const errors = err.details.map((detail) => detail.message);
    next(createHttpError.BadRequest(errors));
  }
};
