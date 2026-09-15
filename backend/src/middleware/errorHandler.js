function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
}

function errorHandler(err, req, res, next) {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid id: ${err.value}`;
  }

  res.status(statusCode).json({ success: false, message });
}

module.exports = { notFound, errorHandler };