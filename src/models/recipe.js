import { model, Schema } from 'mongoose';

const ingredientsSchema = new Schema({
  id: {
    type: String,
    required: true,
    ref: 'ingredient',
  },
  measure: {
    type: String,
    required: true,
  },
});

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
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
      ],
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    area: {
      type: String,
      required: false,
    },
    instructions: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      required: true,
    },
    ingredients: [ingredientsSchema],
  },
  { timestamps: true, versionKey: false },
);

export const RecipesCollection = model('recipes', recipeSchema);
