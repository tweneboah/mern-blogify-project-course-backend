const mongoose = require("mongoose");

//schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    shares: {
      type: Number,
      default: 0,
    },

    posts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

//compile schema to  model

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
