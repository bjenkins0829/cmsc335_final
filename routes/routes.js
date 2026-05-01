const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const router = express.Router();
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const databaseName = process.env.MONGO_DATABASE_NAME;
// const collectionName = process.env.MONGO_COLLECTION_NAME;
// const uri = process.env.MONGO_CONNECTION_STRING;
// const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../templates"));
app.use(bodyParser.urlencoded({extended:false}));

router.get("/signUp", (req, res) => {
  res.render("signUp");
});

router.get("/viewData", (req, res) => {
  res.render("viewData");
});

module.exports = router;