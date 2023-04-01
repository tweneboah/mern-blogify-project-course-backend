const express = require("express");
const { register, login } = require("../../controllers/users/usersCtrl");

const usersRouter = express.Router();

//!Register
usersRouter.post("/api/v1/users/register", register);
// login
usersRouter.post("/api/v1/users/login", login);

module.exports = usersRouter;
