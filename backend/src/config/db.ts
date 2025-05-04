import mongoose, { Error } from "mongoose";
import { MONGO_URI } from "../utils/env";

export const connectDB = () => {
  // MongoDB connection URI from environment variables
  const mongoURI = MONGO_URI;

  if (!mongoURI) {
    throw new Error("MONGO_URI environment variable is not defined");
  }
  // Connect to MongoDB and log success/error
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to the Mongo database!");
    })
    .catch((e: Error) => {
      console.error("Unable to connect to the Mongo database!", e);
      process.exit(); // Exit process on connection failure
    });
};
