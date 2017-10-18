const request = require('request');
const cheerio = require('cheerio');
const express = require("express")

var router = express.Router();

var mongojs = require("mongojs");
var databaseUrl = "scrappitDB";
var collections = ["destinyPosts"];
var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("Database Error:", error);
});


router.get("/", function (req, res) {
    res.render("index");
});

router.get("/scrape", function (req, res) {
    
    request('https://www.reddit.com/r/DestinyTheGame/', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
    
        var $ = cheerio.load(body);    
        var results = [];
    
        $("a.title").each(function (i, element) {
    
            var title = $(element).text();
            var link = $(element).attr("href");
    
            results.push({
                title: title,
                link: "https://www.reddit.com" + link
            });
        });

        var hdbObj = {hits: results};
        res.json(results);
        // res.json(hdbObj);
    });
});

router.get("/saved", function (req, res) {
    
    db.destinyPosts.find({}, function(error, found) {
        // Log any errors if the server encounters one
        if (error) {
          console.log(error);
        }
        // Otherwise, send the result of this query to the browser
        else {
          res.json(found);
        }
    });

});

router.post("/save", function (req, res) {

});


module.exports = router;