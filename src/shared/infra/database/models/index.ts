import { envs } from "../../../../envs";
import mongoose from "mongoose";
import User from "./user.model";
import Institute from "./institute.model";
import Event from "./event.model";
import Feature from "./feature.model";
import Presence from "./presence.model";

const connectDB = async () => {
  try {
    if (!envs.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }
    await mongoose.connect(envs.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export { connectDB, User, Institute, Event, Feature, Presence };
