const mongoose = require("mongoose");
const Joi = require("joi");
const { categorySchema } = require("./category");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },

  trainer: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
  },

  tags: {
    type: [String],
  },

  status: {
    type: String,
    enum: ["Active", "Inactive"],
    required: true,
  },
  category: {
    type: categorySchema,
    required: true
  },
  fee: {
    type: Number,
    required: true
  }
});

const Course = mongoose.model("Course", courseSchema);

function validateCourse(course) {
  const courseSchema = {
    title: Joi.string().required().min(3),
    trainer: Joi.string().required().min(5),
    tags: Joi.array().items(Joi.string()),
    status: Joi.string().required().min(3),
    categoryId: Joi.string().required(),
    fee: Joi.number().required()
  };

  return Joi.validate(course, courseSchema);
}

exports.Course = Course;
exports.validate = validateCourse;
exports.courseSchema = courseSchema;
