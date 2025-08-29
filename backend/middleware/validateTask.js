// Basic validation for POST /api/tasks
const priorities = ['low', 'medium', 'high'];

module.exports = function validateTask(req, res, next) {
  const { title, priority, dueDate } = req.body || {};
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Invalid "title"' });
  }
  if (!priorities.includes(priority)) {
    return res.status(400).json({ error: 'Invalid "priority"' });
  }
  if (dueDate !== undefined && dueDate !== null) {
    const ts = Date.parse(dueDate);
    if (Number.isNaN(ts)) {
      return res.status(400).json({ error: 'Invalid "dueDate"' });
    }
  }
  next();
};
