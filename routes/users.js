const express = require("express");
const bcrypt = require("bcrypt");
const { User, validate } = require("../modules/user");
const _ = require("lodash");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
})

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Exist such user");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.status(201).send(_.pick(user, ["_id", "name", "email"]));
});
module.exports = router;
