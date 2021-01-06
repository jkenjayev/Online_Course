const winston = require("winston");

module.exports = (err, req, res, next) => {
    // TO-DO: bu yerda xatoni log qilish kodi bo'lishi kerak
    winston.error(err.message, err);
    res.status(500).send("Serverda kutulmagan xato ro'y berdi");
  }