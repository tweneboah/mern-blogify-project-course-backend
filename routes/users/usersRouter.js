const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../../controllers/users/usersCtrl");

const usersRouter = express.Router();

//!Register
usersRouter.post("/register", register);
// login
usersRouter.post("/login", login);
// profile
usersRouter.get("/profile/:id", getProfile);

module.exports = usersRouter;
