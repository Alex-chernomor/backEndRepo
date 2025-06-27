import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().trim().min(1).max(16).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least 1 character',
    'string.max': 'Username should have at most 16 characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .max(128)
    .required()
    .messages({ 'string.email': 'Invalid email format' }),
  password: Joi.string()
    .min(8)
    .max(128)
    .required()
    .messages({ 'any.required': 'Password is required' }),
});
