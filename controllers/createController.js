const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

exports.getCreateCategoryForm = (req, res) => {
  res.render("createCategory");
};

exports.getCreateItemForm = async (req, res) => {
  const category_id = req.params.categoryID;
  const category_name = await db.getCategoryNameByID(category_id);

  res.render("createItem", {
    categoryName: category_name,
    categoryID: category_id,
  });
}

const validateCategory = [
  body("name")
    .trim()
    .isAlpha()
    .withMessage("Name must contain letters of the alphabet")
    .isLength({ max: 255 })
    .withMessage("Name cannot exceed 255 characters")
    .notEmpty()
    .withMessage("Name is required"),
];

exports.postCreateCategoryForm = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createCategory", {
        errors: errors.array(),
      });
    }

    const category_name = req.body.name;
    await db.addNewCategory(category_name);
    res.redirect("/");
  },
];

const validateItem = [
  body("name")
    .trim()
    .isAlpha()
    .withMessage("Name must contain letters of the alphabet")
    .isLength({ max: 255 })
    .withMessage("Name cannot exceed 255 characters"),
  body("quantity")
    .trim()
    .isInt({ min: 0 })
    .withMessage("Quantity must be a positive integer")
    .notEmpty()
    .withMessage("Quantity is required"),
];

exports.postCreateItemForm = [
  validateItem,
  async (req, res) => {
    res.redirect("/");
  },
];
