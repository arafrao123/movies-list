import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    moviesToBeWatched: [
      {
        title: String,
        genre: String,
      },
    ],
    moviesWatched: [
      {
        title: String,
        genre: String,
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
