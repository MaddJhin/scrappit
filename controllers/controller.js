const request = require('request');
const cheerio = require('cheerio');
const express = require("express")

var router = express.Router();


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
                link: link
            });
        });
    
        console.log(results);
    });
});