const express = require("express");
const {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
} = require("../../controllers/posts/posts");

const isLoggin = require("../../middlewares/isLoggin");

const postsRouter = express.Router();

//create
postsRouter.post("/", isLoggin, createPost);
//getting all
postsRouter.get("/", getPosts);
//single
postsRouter.get("/:id", getPost);
//update
postsRouter.put("/:id", isLoggin, updatePost);
//delete
postsRouter.delete("/:id", isLoggin, deletePost);
module.exports = postsRouter;
