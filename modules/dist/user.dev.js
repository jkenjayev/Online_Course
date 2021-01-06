"use strict";

var mongoose = require("mongoose");

var Joi = require("joi");

var config = require("config");

var jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 8
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  }
});

userSchema.methods.generateAuthToken = function () {
  var token = jwt.sign({
    _id: this._id
  }, config.get("jwtPrivateKey"));
  return token;
};

var User = mongoose.model("User", userSchema);

function validateUser(user) {
  var schema = {
    name: Joi.string().required().min(3),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(8).max(1024).required()
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;