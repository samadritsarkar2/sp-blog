const mongoose = require("mongoose");

var postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    preview_text : {
      type: String,
      required : true,
    },
    post_text: {
      type: String,
      required: true,
    },
    image: [
      {
        url: String,
        public_id: String,
      },
    ],
    _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    author: {
      type: String,
      required: true,
    },
    
    comments: [
      {
        comment_text: { type: String},
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        username: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
