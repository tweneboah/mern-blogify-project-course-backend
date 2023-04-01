const jwt = require("jsonwebtoken");
const User = require("../model/User/User");
const isLoggin = (req, res, next) => {
  //Get token from header
  const token = req.headers.authorization?.split(" ")[1];

  //? Verify the token
  jwt.verify(token, "anykey", async (err, decoded) => {
    //add user to req obj
    //get the user id
    const userId = decoded?.user?.id;

    const user = await User.findById(userId).select("username email role _id");
    //save user into req obj
    req.userAuth = user;
    if (err) {
      return "Invalid token";
    } else {
      //! save the user
      //* send the user
      next();
    }
  });
};

module.exports = isLoggin;
