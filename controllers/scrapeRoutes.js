const request = require('request');
const cheerio = require('cheerio');
const express = require("express")

var router = express.Router();


router.get("/", function (req, res) {
    res.render("index");
})

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

        var hdbObj = {hits: results}
        console.log(hdbObj);
        // res.json(hdbObj);
        res.render("index", {hits: results});
    });
});

module.exports = router;