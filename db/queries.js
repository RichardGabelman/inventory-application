const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT id, name FROM categories");
  return rows;
}

async function getAllItems(category_ID) {
  const { rows } = await pool.query(`SELECT items.name, quantity FROM items
                                    INNER JOIN categories ON items.category_id=categories.id
                                    WHERE categories.id=$1`, [category_ID]);
  return rows;
}

async function addNewCategory(category_name) {
  await pool.query("INSERT INTO categories (name) VALUES ($1)", [category_name]);
}

async function getCategoryIdByName(category_name) {
  const { row } = await pool.query(`SELECT id FROM categories WHERE name=$1`, [category_name]);
  return row;
}

module.exports = {
  getAllCategories,
  getAllItems,
  addNewCategory
}