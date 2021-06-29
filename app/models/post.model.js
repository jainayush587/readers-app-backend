const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    author: String,
    title: String,
    content: String,
    published: Boolean
    // roles: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Role"
    //   }
    // ]
  },
  { 
    timestamps: true 
  })
);

module.exports = Post;