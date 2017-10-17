// Dependencies
// ======================================================
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hdb = require("express-handlebars");

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

// Routing
// =======================================================
var htmlRoutes = require("./controllers/scrapeRoutes.js");

app.use(htmlRoutes);

// Start Server
// =======================================================
app.listen(PORT, function () {
    console.log("Server Listening on Port: " + PORT);
});

// const request = require('request');
// const cheerio = require('cheerio');

// request('https://www.reddit.com/r/DestinyTheGame/', function (error, response, body) {
//     console.log('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     // console.log('body:', body); // Print the HTML for the Google homepage.

//     var $ = cheerio.load(body);

//     var results = [];

//     $("a.title").each(function (i, element) {

//         var title = $(element).text();
//         var link = $(element).attr("href");

//         results.push({
//             title: title,
//             link: link
//         });
//     });

//     console.log(results);
// });