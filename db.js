const mongoose = require("mongoose");
// require("dotenv").config();

const connectDB = async () => {
  try {
    // Uses the connection string from your .env file
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      dbName: process.env.MONGO_DATABASE_NAME,
    });
    console.log("MongoDB connected successfully via Mongoose.");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;