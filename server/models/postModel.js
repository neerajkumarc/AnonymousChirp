const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  post: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("posts", postSchema);
