const db = require("../db/queries");

async function getAllItems(req, res) {
  const categoryName = req.params.categoryName;
  const categoryID = req.params.categoryID;
  let items = await db.getAllItems(categoryID);
  res.render("category", { categoryName: categoryName, categoryID: categoryID, items: items });
}

module.exports = {
  getAllItems
};