const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  favoriteBreed: {
    type: String,
    required: false,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("User", userSchema, process.env.MONGO_COLLECTION_NAME || "users");