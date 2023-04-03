const asyncHandler = require("express-async-handler");
const Comment = require("../../model/Comment/Comment");
const Post = require("../../model/Post/Post");

//@desc  Create a comment
//@route POST /api/v1/comments/:postId
//@access Private

exports.createComment = asyncHandler(async (req, res) => {
  //get the payload
  const { message, author } = req.body;
  //get post id from params
  const postId = req.params.postId;
  //* Create comment
  const comment = await Comment.create({
    message,
    author: req.userAuth._id,
    postId,
  });
  //Associate comment to a post
  await Post.findByIdAndUpdate(
    postId,
    {
      $push: { comments: comment._id },
    },
    { new: true }
  );
  //send the response
  res.json({
    status: "success",
    message: "Comment created successfully",
    comment,
  });
});

//@desc  Delete comment
//@route DELETE /api/v1/comments/:id
//@access Private

exports.deleteComment = asyncHandler(async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Comment successfully deleted",
  });
});

//@desc  update comment
//@route PUT /api/v1/comments/:id
//@access Private

exports.updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      message: req.body.message,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    status: "success",
    message: "comment successfully updated",
    comment,
  });
});
