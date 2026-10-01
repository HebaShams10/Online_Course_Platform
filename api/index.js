import mongoose from "mongoose";
import app from "../app.js";

// Connect to MongoDB once when the serverless function spins up
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

// Export a handler function for Vercel
export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}
