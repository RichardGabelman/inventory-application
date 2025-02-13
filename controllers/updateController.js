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
    const itemID = req.params.itemID;

    res.redirect("/");
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
      return res.status(400).render("updateCategory", {
        errors: errors.array(),
      });
    }

    const categoryName = req.body.name;
    const categoryID = req.params.categoryID;
    await db.updateCategory(categoryID, categoryName);
    res.redirect(`/category/${categoryName}/${categoryID}`);
  },
];

module.exports = {
  getUpdateItemForm,
  getUpdateCategoryForm,
  postUpdateItemForm,
  postUpdateCategoryForm,
};
