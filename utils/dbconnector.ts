import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables!");
}

declare global {
  var mongooseConnection: Promise<typeof mongoose> | undefined;
}

/**
 * Connects to MongoDB only once and reuses the connection.
 */
export const connectToDB = async () => {
  if (global.mongooseConnection) {
    console.log("✅ Using existing MongoDB connection");
    return global.mongooseConnection;
  }

  console.log("🔗 Creating new MongoDB connection...");
  global.mongooseConnection = mongoose.connect(MONGODB_URI, {
    dbName: "share_prompt",
    bufferCommands: false,
  });

  return global.mongooseConnection;
};
