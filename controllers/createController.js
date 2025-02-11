const db = require("../db/queries");

function getCreateCategoryForm(req, res) {
  res.render("createCategory");
}

async function getCreateItemForm(req, res) {
  const category_id = req.params.categoryID;
  const category_name = await db.getCategoryNameByID(category_id);

  res.render("createItem", { categoryName: category_name, categoryID: category_id })
}

async function postCreateCategoryForm(req, res) {

}

async function postCreateItemForm(req, res) {

}

module.exports = {
  getCreateCategoryForm,
  getCreateItemForm,
  postCreateCategoryForm,
  postCreateItemForm
};