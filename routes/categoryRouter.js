const { Router } = require("express");
const { getAllItems } = require("../controllers/categoryController");

const categoryRouter = Router();

categoryRouter.get("/", getAllItems);

module.exports = categoryRouter;