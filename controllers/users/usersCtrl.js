const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../../model/User/User");
const generateToken = require("../../utils/generateToken");
const { sendEmail } = require("../../utils/sendEmail");
//@desc Register a new user
//@route POST /api/v1/users/register
//@access public

exports.register = asyncHandler(async (req, res) => {
  //get the details
  const { username, password, email } = req.body;
  //! Check if user exists
  const user = await User.findOne({ username });
  if (user) {
    throw new Error("User Already Exists");
  }
  //Register new user
  const newUser = new User({
    username,
    email,
    password,
  });
  //! hash password
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);
  //save
  await newUser.save();
  res.status(201).json({
    status: "success",
    message: "User Registered Successfully",
    // _id: newUser?._id,
    // username: newUser?.username,
    // email: newUser?.email,
    // role: newUser?.role,
    newUser,
  });
});

//@desc Login  user
//@route POST /api/v1/users/login
//@access public

exports.login = asyncHandler(async (req, res) => {
  //? get the login details
  const { username, password } = req.body;
  //! Check if exists
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Invalid login credentials");
  }
  //compare the hashed password with the one the request
  const isMatched = await bcrypt.compare(password, user?.password);
  if (!isMatched) {
    throw new Error("Invalid login credentials");
  }
  //Update the last login
  user.lastLogin = new Date();
  res.json({
    status: "success",
    email: user?.email,
    _id: user?._id,
    username: user?.username,
    role: user?.role,
    token: generateToken(user),
  });
});

//@desc Get profile
//@route POST /api/v1/users/profile/:id
//@access Private

exports.getProfile = asyncHandler(async (req, res, next) => {
  //! get user id from params
  const id = req.userAuth._id;
  const user = await User.findById(id);
  res.json({
    status: "success",
    message: "Profile fetched",
    user,
  });
});

//@desc   Block user
//@route  PUT /api/v1/users/block/:userIdToBlock
//@access Private

exports.blockUser = asyncHandler(async (req, res) => {
  //* Find the user to be blocked
  const userIdToBlock = req.params.userIdToBlock;
  const userToBlock = await User.findById(userIdToBlock);
  if (!userToBlock) {
    throw new Error("User to block not found");
  }
  // ! user who is blocking
  const userBlocking = req.userAuth._id;
  // check if user is blocking him/herself
  if (userIdToBlock.toString() === userBlocking.toString()) {
    throw new Error("Cannot block yourself");
  }
  //find the current user
  const currentUser = await User.findById(userBlocking);
  //? Check if user already blocked
  if (currentUser?.blockedUsers?.includes(userIdToBlock)) {
    throw new Error("User already blocked");
  }
  //push the user to be blocked in the array of the current user
  currentUser.blockedUsers.push(userIdToBlock);
  await currentUser.save();
  res.json({
    message: "User blocked successfully",
    status: "success",
  });
});

//@desc   unBlock user
//@route  PUT /api/v1/users/unblock/:userIdToUnBlock
//@access Private

exports.unblockUser = asyncHandler(async (req, res) => {
  //* Find the user to be unblocked
  const userIdToUnBlock = req.params.userIdToUnBlock;
  const userToUnBlock = await User.findById(userIdToUnBlock);
  if (!userToUnBlock) {
    throw new Error("User to be unblock not found");
  }
  //find the current user
  const userUnBlocking = req.userAuth._id;
  const currentUser = await User.findById(userUnBlocking);

  //check if user is blocked before unblocking
  if (!currentUser.blockedUsers.includes(userIdToUnBlock)) {
    throw new Error("User not block");
  }
  //remove the user from the current user blocked users array
  currentUser.blockedUsers = currentUser.blockedUsers.filter(
    (id) => id.toString() !== userIdToUnBlock.toString()
  );
  //resave the current user
  await currentUser.save();
  res.json({
    status: "success",
    message: "User unblocked successfully",
  });
});

//@desc   who view my profile
//@route  GET /api/v1/users/profile-viewer/:userProfileId
//@access Private

exports.profileViewers = asyncHandler(async (req, res) => {
  //* Find that we want to view his profile
  const userProfileId = req.params.userProfileId;

  const userProfile = await User.findById(userProfileId);
  if (!userProfile) {
    throw new Error("User to view his profile not found");
  }

  //find the current user
  const currentUserId = req.userAuth._id;
  //? Check if user already viewed the profile
  if (userProfile?.profileViewers?.includes(currentUserId)) {
    throw new Error("You have already viewed this profile");
  }
  //push the user current user id into the user profile
  userProfile.profileViewers.push(currentUserId);
  await userProfile.save();
  res.json({
    message: "You have successfully viewed his/her profile",
    status: "success",
  });
});

//@desc   Follwing user
//@route  PUT /api/v1/users/following/:userIdToFollow
//@access Private

exports.followingUser = asyncHandler(async (req, res) => {
  //Find the current user
  const currentUserId = req.userAuth._id;
  //! Find the user to follow
  const userToFollowId = req.params.userToFollowId;
  //Avoid user following himself
  if (currentUserId.toString() === userToFollowId.toString()) {
    throw new Error("You cannot follow yourself");
  }
  //Push the usertofolowID into the current user following field
  await User.findByIdAndUpdate(
    currentUserId,
    {
      $addToSet: { following: userToFollowId },
    },
    {
      new: true,
    }
  );
  //Push the currentUserId into the user to follow followers field
  await User.findByIdAndUpdate(
    userToFollowId,
    {
      $addToSet: { followers: currentUserId },
    },
    {
      new: true,
    }
  );
  //send the response
  res.json({
    status: "success",
    message: "You have followed the user successfully",
  });
});

//@desc   UnFollwing user
//@route  PUT /api/v1/users/unfollowing/:userIdToUnFollow
//@access Private

exports.unFollowingUser = asyncHandler(async (req, res) => {
  //Find the current user
  const currentUserId = req.userAuth._id;
  //! Find the user to unfollow
  const userToUnFollowId = req.params.userToUnFollowId;

  //Avoid user unfollowing himself
  if (currentUserId.toString() === userToUnFollowId.toString()) {
    throw new Error("You cannot unfollow yourself");
  }
  //Remove the usertoUnffolowID from the current user following field
  await User.findByIdAndUpdate(
    currentUserId,
    {
      $pull: { following: userToUnFollowId },
    },
    {
      new: true,
    }
  );
  //Remove the currentUserId from the user to unfollow followers field
  await User.findByIdAndUpdate(
    userToUnFollowId,
    {
      $pull: { followers: currentUserId },
    },
    {
      new: true,
    }
  );
  //send the response
  res.json({
    status: "success",
    message: "You have unfollowed the user successfully",
  });
});

//@desc   Forgot password (send token to user email)
//@route  PUT /api/v1/users/forgot-password
//@access Public

exports.forgotPassword = asyncHandler(async (req, res) => {
  //get user email
  const { email } = req.body;
  //! find the user
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("There's No Email In Our System");
  }
  //Generate the token
  const token = await user.generatePasswordResetToken();
  console.log(token);
  //resave the user
  await user.save();

  //send the email
  sendEmail("e.tweneboah1@gmail.com", token);
  res.json({
    status: "success",
    message: "Password reset email sent",
  });
});

//Password reset
