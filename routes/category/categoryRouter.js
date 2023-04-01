const express = require("express");
const {
  createCategory,
  getCategories,
} = require("../../controllers/categories/category");
const isLoggin = require("../../middlewares/isLoggin");

const categoryRouter = express.Router();

//create
categoryRouter.post("/", isLoggin, createCategory);
//?all
categoryRouter.get("/", getCategories);
module.exports = categoryRouter;
