import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo DB connected");
  } catch (error) {
    console.log("Mongo DB connection error", error);
  }
};
