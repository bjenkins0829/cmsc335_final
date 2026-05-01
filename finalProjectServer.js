const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

process.stdin.setEncoding("utf8");
if (process.argv.length != 3) {
  process.stdout.write("Usage finalProjectServer.js PORT_NUMBER");
  process.exit(1);
}

const app = express(); 
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"));
app.use(bodyParser.urlencoded({extended:false}));

app.use("/routes", routes)

app.get("/", (request, response) => {
  response.render("index");
});

const PORT_NUMBER = process.argv[2];
app.listen(PORT_NUMBER, (err) => {
  if (err) {
    console.log("Starting server failed.\n");
  } else {
    console.log(`Web server started and running at: http://localhost:${PORT_NUMBER}`);
  }
});