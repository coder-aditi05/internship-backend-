// src/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack || err);
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message || "Server error" });
};
