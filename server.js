// Dependencies
// ======================================================
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hdb = require("express-handlebars");
const mongojs = require("mongojs");

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
var databaseUrl = "scrappitDB";
var collections = ["destinyPosts"];
var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("Database Error:", error);
});



// Routing
// =======================================================
var htmlRoutes = require("./controllers/scrapeRoutes.js");

app.use(htmlRoutes);

// Start Server
// =======================================================
app.listen(PORT, function () {
    console.log("Server Listening on Port: " + PORT);
});