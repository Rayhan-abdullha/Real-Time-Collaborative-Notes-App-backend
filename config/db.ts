import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://rayhan:6apbpSfr83NjzM1T@cluster0.lcnnv.mongodb.net/notes?retryWrites=true&w=majority");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;
