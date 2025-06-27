
import { model, Schema } from 'mongoose';

const userSchema = new Schema(

  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorites: [
      {

        type: mongoose.Schema.Types.ObjectId,

        ref: 'Recipe',
      },
    ],
    own: [
      {

        type: mongoose.Schema.Types.ObjectId,

        ref: 'Recipe',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {




  const object = this.toObject();
  delete object.password;
  return object;
};


export const User = mongoose.model('User', userSchema);

