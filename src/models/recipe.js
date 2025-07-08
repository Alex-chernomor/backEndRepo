import { mongoose, Schema } from 'mongoose';

const ingredientsSchema = new mongoose.Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Ingredient',
  },
  measure: {
    type: String,
    required: true,
  },
});

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      ref: 'Category',
      // enum: [
      //   'Seafood',
      //   'Lamb',
      //   'Starter',
      //   'Chicken',
      //   'Beef',
      //   'Dessert',
      //   'Vegan',
      //   'Pork',
      //   'Vegetarian',
      //   'Miscellaneous',
      //   'Pasta',
      //   'Breakfast',
      //   'Side',
      //   'Goat',
      //   'Soup',
      // ],
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    area: {
      type: String,
      required: false,
    },
    instructions: {
      type: String,
      required: true,
    },
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
      default: null,
    },
    ingredients: [ingredientsSchema],
    cals: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Recipe = mongoose.model('Recipe', recipeSchema);
