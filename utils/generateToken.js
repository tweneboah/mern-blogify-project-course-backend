const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  //create payload for the user
  const payload = {
    user: {
      id: user.id,
    },
  };
  //sign the token with a secret key
  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: 36000, //Exires 1hr
  });
  return token;
};

module.exports = generateToken;
