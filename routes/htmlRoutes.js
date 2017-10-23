const request = require('request');
const cheerio = require('cheerio');
const express = require("express")

var router = express.Router();

var db = require ("../models");

// mongoose.Promise = Promise;
// mongoose.connect("mongodb://localhost/scrappitDB", {
//   useMongoClient: true
// });


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
        console.log(hdbObj);
        var hdbObj = {hits: results};
        res.render("index", hdbObj);
    });
});

router.get("/saved", function (req, res) {
    
    db.Post
        .find({})
        .then( function(found) {
        // Log any errors if the server encounters one
            res.render("saved", {hits: found});
        })
        .catch(function (derp) {
            res.json(derp);
        });
});

router.get("/allPosts", function (req, res) {
    
    db.Post
        .find({})
        .then( function(found) {
        // Log any errors if the server encounters one
            res.json(found);
        })
        .catch(function (derp) {
            res.json(derp);
        });
});

router.get("/allNotes", function (req, res) {
    
    db.Note
        .find({})
        .then( function(found) {
        // Log any errors if the server encounters one
            res.json(found);
        })
        .catch(function (derp) {
            res.json(derp);
        });
});

router.post("/save", function (req, res) {
    console.log("Save body", req.body);
    db.Post
        .create(req.body)
        .then(function (dbPost) {
            send.json(dbPost)
        })
        .catch(function (derp) {
            res.json(derp);
        });
});

router.post("/removePost", function (req, res) {
    console.log("Removing Post", req.body);
    db.Post
        .remove(req.body)
        .then(function(dbPost){
            res.json(dbPost);
        })
        .catch(function (derp) {
            res.json(derp);
        });
});

router.get("/comment/:id", function(req, res) {

    db.Post
      .findOne({ _id: req.params.id })
      .populate("notes")
      .then(function(dbPost) {
        res.json(dbPost);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

router.post("/comment/:id", function(req, res){
    console.log("Saving Note", req.body);

    // var note = new Note({
    //     body: req.body
    // });

    // note.save();

    db.Note
    .create(req.body)
    .then(function(dbNote) {
        console.log("Post Id", req.params.id);
        console.log("Note Reference", dbNote._id);

        var id = req.params.id;
        var update = {$push: {notes: dbNote._id}};
        db.Post.findOneAndUpdate({_id: id} , update, function(err, doc){
            if (err)
                throw err;
        });    
    })
    // .then(function(dbPost) {
        // res.json(dbPost);
        
    // })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });


}); 

router.get("/comments", function(req, res){
    console.log("Getting comments for", req.body);
    
});

router.post("/removeComment", function(req, res){
    console.log("Removing Comment", req.body);

});

module.exports = router;