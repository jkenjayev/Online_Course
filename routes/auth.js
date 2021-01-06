const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../modules/user");
const _ = require("lodash");
const router = express.Router();


router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email or password is wrong!!!");

  const isValidPwd = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPwd) return res.status(400).send("email or password is wrong!!!");
  
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(true);
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(8).max(1024).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
