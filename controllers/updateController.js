const db = require("../db/queries");

const getUpdateItemForm = async (req, res) => {
  const itemID = req.params.itemID;
  const item = await db.getItemByID(itemID);

  res.render("updateItem", {
    item: item,
  });
}

const getUpdateCategoryForm = async (req, res) => {
  const categoryID = req.params.categoryID;
  const category = await db.getCategoryByID(categoryID);

  res.render("updateCategory", {
    category: category,
  });
}

module.exports = {
  getUpdateItemForm,
  getUpdateCategoryForm
};