const { validationResult } = require('express-validator');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const message = errors.array().map((e) => `${e.path}: ${e.msg}`).join(', ');
  res.status(400).json({ success: false, message });
}

module.exports = validate;