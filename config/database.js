const mongoose = require("mongoose");
//connect to db

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mern-blog");
    console.log("DB has been connected");
  } catch (error) {
    console.log("DB Connection failed", error.message);
  }
};

module.exports = connectDB;
