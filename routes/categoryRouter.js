const { Router } = require("express");
const { getAllItems } = require("../controllers/categoryController");

const categoryRouter = Router();

categoryRouter.get("/:categoryName/:categoryID", getAllItems);

module.exports = categoryRouter;