import mongoose from "mongoose";
import { config } from "./env";

const connectDB = async () => {
  try {
    await mongoose.connect(config.url as string, {
      writeConcern: { w: 'majority' },
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;
