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
  uploadeProfilePicture,
  uploadeCoverImage,
  updateUserProfile,
} = require("../../controllers/users/usersCtrl");
const isLoggin = require("../../middlewares/isLoggin");
const storage = require("../../utils/fileUpload");
const { getPublicProfile } = require("../../controllers/users/usersCtrl");

const usersRouter = express.Router();

//! file upload middleware
const upload = multer({ storage });

//!Register
usersRouter.post("/register", register);
// login
usersRouter.post("/login", login);

// upload profile image
usersRouter.put(
  "/upload-profile-image",
  isLoggin,
  upload.single("file"),
  uploadeProfilePicture
);
// upload profile image
usersRouter.put(
  "/upload-cover-image",
  isLoggin,
  upload.single("file"),
  uploadeCoverImage
);
// public profile
usersRouter.get("/public-profile/:userId", getPublicProfile);
// profile
usersRouter.get("/profile/", isLoggin, getProfile);
//!  update profile
usersRouter.put("/update-profile/", isLoggin, updateUserProfile);

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
usersRouter.get("/account-verification/:verifyToken", isLoggin, verifyAccount);

// forgot password user
usersRouter.post("/forgot-password", forgotpassword);

// following user
usersRouter.put("/following/:userToFollowId", isLoggin, followingUser);
// unfollowing user
usersRouter.put("/unfollowing/:userToUnFollowId", isLoggin, unFollowingUser);
// reset password user
usersRouter.post("/reset-password/:resetToken", resetPassword);

module.exports = usersRouter;
