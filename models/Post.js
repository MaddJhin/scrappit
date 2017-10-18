// Require mongoose
const mongoose = require("mongoose");

// Create a Schema class with mongoose
var Schema = mongoose.Schema;

// Create Post Schema using Schema Class
var PostSchema = new Schema({
    title: {
      type: String,
      unique: true
    },
    link: {
        type: String,
        unique: true
    },
    notes: [{
      type: Schema.Types.ObjectId,
      ref: "Note"
    }]
});

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;