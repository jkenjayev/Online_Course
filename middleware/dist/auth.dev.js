"use strict";

var jwt = require("jsonwebtoken");

var config = require("config");

module.exports = function auth(req, res, next) {
  var token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Token bo'lmaganligi sababli murojaat rad etildi !!!");

  try {
    var decoded = jwt.verify(token, config.get("jwtPrivateKey"));
  } catch (ex) {
    return res.status(400).send("Yaroqsiz token");
  }
};