const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT id, name FROM categories");
  return rows;
}

async function getAllItems(category_ID) {
  const { rows } = await pool.query(`SELECT * FROM items WHERE category_id=$1`, [category_ID]);
  return rows;
}

async function getItemByID(item_ID) {
  const { rows } = await pool.query("SELECT * FROM items WHERE id=$1", [item_ID]);
  return rows[0];
}

async function getCategoryByID(category_ID) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id=$1", [category_ID]);
  return rows[0];
}

async function addNewCategory(category_name) {
  await pool.query("INSERT INTO categories (name) VALUES ($1)", [category_name]);
}

async function addNewItem(category_ID, product) {
  await pool.query("INSERT INTO items (name, category_id, quantity) VALUES ($1, $2, $3)", [product.name, category_ID, product.quantity]);
}

module.exports = {
  getAllCategories,
  getAllItems,
  addNewCategory,
  addNewItem,
  getItemByID,
  getCategoryByID
}