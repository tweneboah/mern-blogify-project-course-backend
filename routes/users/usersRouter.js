const express = require("express");
const multer = require("multer");

const {
  register,
  login,
  getProfile,
  blockUser,
  unblockUser,
  profileViewers,
  followingUser,
  unFollowingUser,
  resetPassword,
  forgotpassword,
  accountVerificationEmail,
  verifyAccount,
} = require("../../controllers/users/usersCtrl");
const isLoggin = require("../../middlewares/isLoggin");
const storage = require("../../utils/fileUpload");

const usersRouter = express.Router();

//! file upload middleware
const upload = multer({ storage });

//!Register
usersRouter.post("/register", upload.single("profilePicture"), register);
// login
usersRouter.post("/login", login);
// profile
usersRouter.get("/profile/", isLoggin, getProfile);
// block user
usersRouter.put("/block/:userIdToBlock", isLoggin, blockUser);
// ublock user
usersRouter.put("/unblock/:userIdToUnBlock", isLoggin, unblockUser);
// unblock user
usersRouter.get("/profile-viewer/:userProfileId", isLoggin, profileViewers);

// send account verification email
usersRouter.put(
  "/account-verification-email",
  isLoggin,
  accountVerificationEmail
);

// send account verification email
usersRouter.put("/account-verification/:verifyToken", isLoggin, verifyAccount);

// forgot password user
usersRouter.post("/forgot-password", forgotpassword);

// following user
usersRouter.put("/following/:userToFollowId", isLoggin, followingUser);
// unfollowing user
usersRouter.put("/unfollowing/:userToUnFollowId", isLoggin, unFollowingUser);
// reset password user
usersRouter.post("/reset-password/:resetToken", resetPassword);

module.exports = usersRouter;
