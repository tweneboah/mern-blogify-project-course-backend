const express = require("express");
const {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
  getPublicPosts,
} = require("../../controllers/posts/posts");

const isLoggin = require("../../middlewares/isLoggin");
const checkAccountVerification = require("../../middlewares/isAccountVerified");

const postsRouter = express.Router();

//create
postsRouter.post("/", isLoggin, checkAccountVerification, createPost);
//getting all
postsRouter.get("/", isLoggin, getPosts);
//get only 4 posts
postsRouter.get("/public", getPublicPosts);
//single
postsRouter.get("/:id", getPost);
//update
postsRouter.put("/:id", isLoggin, updatePost);
//delete
postsRouter.delete("/:id", isLoggin, deletePost);
module.exports = postsRouter;
