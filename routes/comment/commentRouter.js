const express = require("express");
const {
  createComment,
  deleteComment,
  updateComment,
} = require("../../controllers/comments/comments");

const isLoggin = require("../../middlewares/isLoggin");
const commentRouter = express.Router();

//create
commentRouter.post("/:postId", isLoggin, createComment);

//update
commentRouter.put("/:id", isLoggin, updateComment);

//delete
commentRouter.delete("/:id", isLoggin, deleteComment);

module.exports = commentRouter;
