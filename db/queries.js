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

module.exports = {
  getAllCategories,
  getAllItems,
  addNewCategory
}