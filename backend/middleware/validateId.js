// Ensure :id is a valid number before hitting the route handler
module.exports = function validateId(req, res, next) {
  const id = Number(req.params.id);
  if (Number.isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid task id' });
  }
  req.taskId = id; // save parsed id for convenience
  next();
};
