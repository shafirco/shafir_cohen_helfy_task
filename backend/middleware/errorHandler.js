// Centralized error handler (last in chain)
module.exports = function errorHandler(err, req, res, next) {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
};
