const db = require("../db/queries");

async function getAllItems(req, res) {
  const category_name = req.params.name;
  let items = await db.getAllItems(category_name);
  console.log("Category: ", category_name);
  console.log("Items: ", items);
  res.render("category", { categoryName: category_name, items: items });
}

module.exports = {
  getAllItems
};