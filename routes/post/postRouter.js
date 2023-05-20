const express = require("express");
const multer = require("multer");
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
  schedule,
  postViewCount,
} = require("../../controllers/posts/posts");

const isLoggin = require("../../middlewares/isLoggin");
const storage = require("../../utils/fileUpload");

const postsRouter = express.Router();
//! file upload middleware

const upload = multer({ storage });

//create
postsRouter.post("/", isLoggin, upload.single("file"), createPost);
//getting all
postsRouter.get("/", isLoggin, getPosts);
//get only 4 posts
postsRouter.get("/public", getPublicPosts);
//like post
postsRouter.put("/likes/:id", isLoggin, likePost);
//schedule post
postsRouter.put("/schedule/:postId", isLoggin, schedule);
//dislike post
postsRouter.put("/dislikes/:id", isLoggin, disLikePost);
//clap a post
postsRouter.put("/claps/:id", isLoggin, claps);
//update
postsRouter.put("/:id/post-view-count", isLoggin, postViewCount);
//single
postsRouter.get("/:id", getPost);
//update
postsRouter.put("/:id", isLoggin, upload.single("file"), updatePost);

//delete
postsRouter.delete("/:id", isLoggin, deletePost);
module.exports = postsRouter;
