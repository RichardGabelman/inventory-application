const { Router } = require("express");
const { getUpdateItemForm, getUpdateCategoryForm } = require("../controllers/updateController");

const updateRouter = Router();

updateRouter.get("/item/:itemID", getUpdateItemForm);
updateRouter.get("/category/:categoryID", getUpdateCategoryForm)

module.exports = updateRouter;