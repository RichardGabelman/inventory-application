const { Router } = require("express");
const { postDeleteItem, postDeleteCategory } = require("../controllers/deleteController");

const deleteRouter = Router();

deleteRouter.post("/item/:itemID", postDeleteItem);
deleteRouter.post("/category/:categoryID", postDeleteCategory);

module.exports = deleteRouter;