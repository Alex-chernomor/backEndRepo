import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    area: {
      type: String,
      required: true,
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
      default: null,
    },
    time: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
export const Recipe = mongoose.model('Recipe', recipeSchema);
