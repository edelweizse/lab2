import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to the database"))
  } catch (error) {
    console.log("Error happened while connecting to the database: ", error.message)
    process.exit(1)
  }
}