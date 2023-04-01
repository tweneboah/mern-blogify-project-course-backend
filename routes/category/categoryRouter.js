const express = require("express");
const {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} = require("../../controllers/categories/category");
const isLoggin = require("../../middlewares/isLoggin");

const categoryRouter = express.Router();

//create
categoryRouter.post("/", isLoggin, createCategory);
//?all
categoryRouter.get("/", getCategories);
// ! delete
categoryRouter.delete("/:id", isLoggin, deleteCategory);
// * Update
categoryRouter.put("/:id", isLoggin, updateCategory);

module.exports = categoryRouter;
