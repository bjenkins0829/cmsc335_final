const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const router = express.Router();
const User = require("../models/User");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const databaseName = process.env.MONGO_DATABASE_NAME;
// const collectionName = process.env.MONGO_COLLECTION_NAME;
// const uri = process.env.MONGO_CONNECTION_STRING;
// const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../templates"));
app.use(bodyParser.urlencoded({ extended: false }));

router.get("/signUp", (req, res) => {
  res.render("signUp", { message: null, error: null });
});

// POST /routes/signUp — handle form submission and save to MongoDB
router.post("/signUp", async (req, res) => {
  try {
    const { name, email, favoriteBreed } = req.body;
    
    // Create a new document using the Mongoose model
    const newUser = new User({
      name,
      email,
      favoriteBreed
    });

    // Save to database
    await newUser.save();
    
    res.render("signUp", { message: "Successfully signed up! 🐾", error: null });
  } catch (err) {
    console.error(err);
    res.render("signUp", { message: null, error: "Failed to save data. Please try again." });
  }
});

// GET /routes/viewData — retrieve data from MongoDB and display it
router.get("/viewData", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}).sort({ dateAdded: -1 });
    res.render("viewData", { users });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to retrieve data from database.");
  }
});

// GET /routes/dogs — render the breed browser page
router.get("/dogs", async (req, res) => {
  try {
    // Fetch all breeds for the dropdown
    const breedRes = await fetch("https://dog.ceo/api/breeds/list/all");
    const breedData = await breedRes.json();
    const breeds = Object.keys(breedData.message); // top-level breed names

    // If a breed was selected, fetch images for it
    const selectedBreed = req.query.breed || null;
    let images = [];
    let error = null;

    if (selectedBreed) {
      const imgRes = await fetch(
        `https://dog.ceo/api/breed/${selectedBreed}/images/random/12`,
      );
      const imgData = await imgRes.json();
      if (imgData.status === "success") {
        images = imgData.message;
      } else {
        error = "Could not load images for that breed.";
      }
    }

    res.render("dogs", { breeds, selectedBreed, images, error });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch data from Dog API.");
  }
});

module.exports = router;
