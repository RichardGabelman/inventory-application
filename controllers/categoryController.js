const db = require("../db/queries");

async function getAllItems(req, res) {
  const categoryID = req.params.categoryID;
  const category = await db.getCategoryByID(categoryID);
  let items = await db.getAllItems(categoryID);
  res.render("category", { category: category, items: items });
}

module.exports = {
  getAllItems
};