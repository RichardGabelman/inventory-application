const db = require("../db/queries");

async function getAllCategories(req, res) {
  let categories = await db.getAllCategories();
  console.log("Categories: ", Categories);
  res.render("index", { categories: categories });
}