const express = require("express");
const { createPost } = require("../../controllers/posts/posts");

const isLoggin = require("../../middlewares/isLoggin");

const postsRouter = express.Router();

//create
postsRouter.post("/", isLoggin, createPost);

module.exports = postsRouter;
