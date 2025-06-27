import { model, Schema } from 'mongoose';

const ingredientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: { type: String, required: true },
    img: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const IngredientsCollection = model('ingredient', ingredientSchema);
