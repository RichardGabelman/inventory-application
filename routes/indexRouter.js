const { Router } = require("express");
const { getAllCategories } = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", getAllCategories);

module.exports = indexRouter;