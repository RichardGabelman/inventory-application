const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT name FROM categories");
  return rows;
}

async function getAllItems(category_name) {
  const { rows } = await pool.query(`SELECT name, quantity FROM items
                                    INNER JOIN categories ON items.category_id=categories.id
                                    WHERE categories.name=$1`, [category_name]);
  return rows;
}

module.exports = {
  getAllCategories,
  getAllItems
}