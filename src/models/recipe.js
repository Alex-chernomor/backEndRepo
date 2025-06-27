import { model, Schema } from 'mongoose';

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    ingredients: {
      type: String,
      required: true,
    },

    instructions: {
      type: String,
      required: true,
    },

    area: {
      type: String,
      required: false,
    },

    time: {
      type: String,
      required: false,
    },

    thumb: {
      type: String,
      required: false,
      default: null,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

export const RecipesCollection = model('recipes', recipeSchema);
