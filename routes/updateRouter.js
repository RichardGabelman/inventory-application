const { Router } = require("express");
const { getUpdateItemForm, getUpdateCategoryForm, postUpdateItemForm, postUpdateCategoryForm } = require("../controllers/updateController");

const updateRouter = Router();

updateRouter.get("/item/:itemID", getUpdateItemForm);
updateRouter.get("/category/:categoryID", getUpdateCategoryForm)

updateRouter.post("/item/:itemID", postUpdateItemForm);
updateRouter.post("/category/:categoryID", postUpdateCategoryForm);

module.exports = updateRouter;