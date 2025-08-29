// Basic validation for POST /api/tasks
const priorities = ['low', 'medium', 'high'];

module.exports = function validateTask(req, res, next) {
  const { title, priority } = req.body || {};
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Invalid "title"' });
  }
  if (!priorities.includes(priority)) {
    return res.status(400).json({ error: 'Invalid "priority"' });
  }
  next();
};
