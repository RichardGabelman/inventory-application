const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

exports.getCreateCategoryForm = (req, res) => {
  res.render("createCategory");
};

exports.getCreateItemForm = async (req, res) => {
  const categoryID = req.params.categoryID;
  const category = await db.getCategoryByID(categoryID);

  res.render("createItem", {
    category: category,
  });
};

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

    const categoryName = req.body.name;
    await db.addNewCategory(categoryName);
    res.redirect("/");
  },
];

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

exports.postCreateItemForm = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const category = await db.getCategoryByID(req.params.categoryID);
      return res.status(400).render("createItem", {
        errors: errors.array(),
        category: category,
      });
    }

    const categoryID = req.params.categoryID;

    const productName = req.body.name;
    const productQuantity = req.body.quantity;

    await db.addNewItem(categoryID, {
      name: productName,
      quantity: productQuantity,
    });
    res.redirect(`/category/${categoryID}`);
  },
];
