const db = require("../db/queries");

async function getAllCategories(req, res) {
  let categories = await db.getAllCategories();
  console.log("Categories: ", categories);
  res.render("index", { categories: categories });
}