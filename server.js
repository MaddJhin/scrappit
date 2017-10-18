// Dependencies
// ======================================================
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hdb = require("express-handlebars");
var mongoose = require("mongoose");


// App Setup
// ======================================================
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


// Set Handlebars as the default templating engine
// =======================================================
app.engine("handlebars", hdb({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// MongoDB setup
// =======================================================
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/scrappitDB", { useMongoClient: true });
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Routing
// =======================================================
var htmlRoutes = require("./routes/htmlRoutes.js");

app.use(htmlRoutes);


// Start Server
// =======================================================
app.listen(PORT, function () {
    console.log("Server Listening on Port: " + PORT);
});