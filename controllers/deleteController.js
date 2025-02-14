const db = require("../db/queries");

async function postDeleteItem(req, res) {
  const itemID = req.params.itemID;
  const item = await db.getItemByID(itemID);
  const categoryID = item.category_id;
  
  await db.deleteItem(itemID);
  res.redirect(`/category/${categoryID}`);
}

async function postDeleteCategory(req, res) {
  const categoryID = req.params.categoryID;
  await db.deleteCategory(categoryID);
  res.redirect("/");
}

module.exports = {
  postDeleteItem,
  postDeleteCategory
};