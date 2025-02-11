const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

exports.getCreateCategoryForm = (req, res) => {
  res.render("createCategory");
};

exports.getCreateItemForm = async (req, res) => {
  const categoryName = req.params.categoryName;
  const categoryID = req.params.categoryID;

  res.render("createItem", {
    categoryName: categoryName,
    categoryID: categoryID,
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
    const categoryID = req.params.categoryID;
    const categoryName = req.params.categoryName;
    res.redirect(`/category/${categoryName}/${categoryID}`);
  },
];
