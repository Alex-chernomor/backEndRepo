import Joi from 'joi';

import { isValidObjectId } from 'mongoose';

export const createRecipeSchema = Joi.object({
  
  name: Joi.string().max(64).required().messages({
    'string.base': 'Name should be a string',
    'string.max': 'Name should have at most 64 characters',
    'any.required': 'Name is required',
  }),
  decr: Joi.string().max(200).required().messages({
    'string.max': 'Description should have at most 200 characters',
    'any.required': 'Description is required',
  }),
  cookiesTime: Joi.string().min(1).max(360).required().messages({
    'string.min': 'Cookies time should be min 1 minute long',
    'string.max': 'Cookies time should be max 360 minutes long',
    'any.required': 'Cookies time is required',
  }),
  cals: Joi.string().min(1).max(10000).optional().messages({
    'string.min': '1 callorie is a minimum',
    'string.max': 'Max 10000 calories',
  }),
  category: Joi.string()
    .valid(
      'Seafood',
      'Lamb',
      'Starter',
      'Chicken',
      'Beef',
      'Dessert',
      'Vegan',
      'Pork',
      'Vegetarian',
      'Miscellaneous',
      'Pasta',
      'Breakfast',
      'Side',
      'Goat',
      'Soup',
    )
    .required()
    .messages({
      'any.required': 'Category type is required',
      'any.only':
        'Category type should be one of: Seafood, Lamb, Starter, Chicken, Beef, Dessert, Vegan, Pork, Vegetarian, Miscellaneous, Pasta, Breakfast, Side, Goat or Soup.',
    }),
  //! ID одного інгредієнта з колекції Ingredient
  ingredient: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  ingredientAmount: Joi.string().min(2).max(16).required().messages({
    'string.min': 'Min 1 ingredient',
    'string.max': 'Max 360 ingredients',
    'any.required': 'Ingredient amount is required',
  }),
  instructions: Joi.string().max(1200).required().messages({
    'string.max': 'Instructions should have at most 1200 characters',
    'any.required': 'Instructions are required',
  }),
  thumb: Joi.string().uri().optional(),
  owner: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('Owner id should be a valid mongo id');
    }
    return true;
  }),
});
