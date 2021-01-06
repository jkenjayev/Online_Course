const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Category = mongoose.model("Category", categorySchema);
// Validate the request
function validateCategory(ctg) {
  const categorySchema = {
    name: Joi.string().required().min(3),
  };

  return Joi.validate(ctg, categorySchema);
}

exports.Category = Category;
exports.validate = validateCategory;
exports.categorySchema = categorySchema;
