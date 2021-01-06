const express = require("express");
const router = express.Router();
const { validate, Category } = require("../modules/category");
const auth = require("../middlewares/auth");

// ROUTES

// GET route
router.get("/", async (req, res) => {
  throw new Error("Toifalarni olishda kutilmagan xato ro'y berdi...");
  const category = await Category.find().sort("name");
  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send("Category not found");
  res.send(category);
});

// POST route
router.post("/", auth, async (req, res) => {
  // validate the category
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({
    name: req.body.name,
  });

  const result = await category.save();
  res.status(201).send(category);
});

// PUT route
router.put("/:id", auth, async (req, res) => {
  // validate the category
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!category) return res.status(404).send("Category not found");

  res.send(category);
});

// DELETE route
router.delete("/:id", auth, async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category) return res.status(404).send("Category not found");
  res.send(category);
});

module.exports = router;
