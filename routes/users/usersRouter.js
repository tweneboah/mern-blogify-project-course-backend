const express = require("express");
const {
  register,
  login,
  getProfile,
  blockUser,
  unblockUser,
  profileViewers,
  followingUser,
  unFollowingUser,
  forgotPassword,
  resetPassword,
  forgotpassword,
} = require("../../controllers/users/usersCtrl");
const isLoggin = require("../../middlewares/isLoggin");

const usersRouter = express.Router();

//!Register
usersRouter.post("/register", register);
// login
usersRouter.post("/login", login);
// profile
usersRouter.get("/profile/", isLoggin, getProfile);
// block user
usersRouter.put("/block/:userIdToBlock", isLoggin, blockUser);
// ublock user
usersRouter.put("/unblock/:userIdToUnBlock", isLoggin, unblockUser);
// ublock user
usersRouter.get("/profile-viewer/:userProfileId", isLoggin, profileViewers);

// forgot password user
usersRouter.post("/forgot-password", forgotpassword);

// following user
usersRouter.put("/following/:userToFollowId", isLoggin, followingUser);
// unfollowing user
usersRouter.put("/unfollowing/:userToUnFollowId", isLoggin, unFollowingUser);
// reset password user
usersRouter.post("/reset-password/:resetToken", resetPassword);

module.exports = usersRouter;
