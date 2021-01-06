const express = require("express");
const winston = require("winston");
const app = express();

require("./startup/logging");
require("./startup/routes")(app);
require("./startup/connDB")();
require("./startup/config");

const port = process.env.PORT;
const server = app.listen(port, () => {
  winston.info(`${port}-portni eshitishni boshlandim...`);
});


module.exports = server;