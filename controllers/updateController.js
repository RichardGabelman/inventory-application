const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const getUpdateItemForm = async (req, res) => {
  const itemID = req.params.itemID;
  const item = await db.getItemByID(itemID);

  res.render("updateItem", {
    item: item,
  });
};

const getUpdateCategoryForm = async (req, res) => {
  const categoryID = req.params.categoryID;
  const category = await db.getCategoryByID(categoryID);

  res.render("updateCategory", {
    category: category,
  });
};

const validateItem = [
  body("name")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Name cannot exceed 255 characters"),
  body("quantity")
    .trim()
    .isInt({ min: 0 })
    .withMessage("Quantity must be a positive integer")
    .notEmpty()
    .withMessage("Quantity is required"),
];

const postUpdateItemForm = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    const itemID = req.params.itemID;
    const item = await db.getItemByID(itemID);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateItem", {
        errors: errors.array(),
        item: item,
      });
    }
    const itemName = req.body.name;
    const itemQuantity = req.body.quantity;
    await db.updateItem(itemID, itemName, itemQuantity);

    const categoryID = item.category_id;
    res.redirect(`/category/${categoryID}`);
  },
];

const validateCategory = [
  body("name")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Name cannot exceed 255 characters")
    .notEmpty()
    .withMessage("Name is required"),
];

const postUpdateCategoryForm = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const categoryID = req.params.categoryID;
      const category = await db.getCategoryByID(categoryID);
      return res.status(400).render("updateCategory", {
        errors: errors.array(),
        category: category,
      });
    }

    const categoryName = req.body.name;
    const categoryID = req.params.categoryID;
    await db.updateCategory(categoryID, categoryName);
    res.redirect(`/category/${categoryID}`);
  },
];

module.exports = {
  getUpdateItemForm,
  getUpdateCategoryForm,
  postUpdateItemForm,
  postUpdateCategoryForm,
};
