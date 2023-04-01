const http = require("http");
const express = require("express");
const usersRouter = require("./routes/users/usersRouter");
require("./config/database")();

//!Server
const app = express();

//middlewares
app.use(express.json()); //Pass incoming data
// Routes
app.use("/api/v1/users", usersRouter);
//? Not Found middleware
app.use((req, res, next) => {
  const err = new Error(`Cannot find ${req.originalUrl} on the server`);
  next(err);
});
//! Error middleware
app.use((err, req, res, next) => {
  //status
  const status = err?.status ? err?.status : "failed";
  //message
  const message = err?.message;
  //stack
  const stack = err?.stack;
  res.status(500).json({
    status,
    message,
    stack,
  });
});

const server = http.createServer(app);
//? Start the server
const PORT = process.env.PORT || 9080;
server.listen(PORT, console.log(`Server is running on port ${PORT}`));
