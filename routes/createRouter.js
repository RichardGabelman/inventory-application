const { Router } = require("express");
const {
  getCreateCategoryForm,
  getCreateItemForm,
  postCreateCategoryForm,
  postCreateItemForm,
} = require("../controllers/createController");

const createRouter = Router();

createRouter.get("/category", getCreateCategoryForm);
createRouter.get("/item/:categoryName/:categoryID", getCreateItemForm);

createRouter.post("/category", postCreateCategoryForm);
createRouter.post("/item/:categoryID", postCreateItemForm);

module.exports = createRouter;
