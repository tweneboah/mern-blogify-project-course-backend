const express = require("express");
const {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
  getPublicPosts,
  likePost,
  disLikePost,
  claps,
} = require("../../controllers/posts/posts");

const isLoggin = require("../../middlewares/isLoggin");

const postsRouter = express.Router();

//create
postsRouter.post("/", isLoggin, createPost);
//getting all
postsRouter.get("/", isLoggin, getPosts);
//get only 4 posts
postsRouter.get("/public", getPublicPosts);
//like post
postsRouter.put("/likes/:id", isLoggin, likePost);
//dislike post
postsRouter.put("/dislikes/:id", isLoggin, disLikePost);
//clap a post
postsRouter.put("/claps/:id", isLoggin, claps);
//single
postsRouter.get("/:id", getPost);
//update
postsRouter.put("/:id", isLoggin, updatePost);
//delete
postsRouter.delete("/:id", isLoggin, deletePost);
module.exports = postsRouter;
