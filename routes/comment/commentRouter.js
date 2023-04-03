const express = require("express");
const { createComment } = require("../../controllers/comments/comments");

const isLoggin = require("../../middlewares/isLoggin");
const commentRouter = express.Router();

//create
commentRouter.post("/:postId", isLoggin, createComment);

module.exports = commentRouter;
