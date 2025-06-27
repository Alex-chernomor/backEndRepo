import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
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
        type: Schema.Types.ObjectId,

        ref: 'Recipe',
      },
    ],
    own: [
      {
        type: Schema.Types.ObjectId,

        ref: 'Recipe',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

usersSchema.methods.toJSON = function () {
  const object = this.toObject();
  delete object.password;
  return object;
};

export const UsersCollection = model('user', usersSchema);
