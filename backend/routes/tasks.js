const express = require('express');
const router = express.Router();

const priorities = ['low','medium','high'];
let tasks = []; // in-memory array

// GET /api/tasks - return all tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// POST /api/tasks - create new task
router.post('/', (req, res) => {
  const { title, description, priority } = req.body;
  if (!title || !priorities.includes(priority)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const newTask = {
    id: Date.now(),
    title,
    description: description ? description.trim() : '',
    completed: false,
    createdAt: new Date().toISOString(),
    priority
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id - update task
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  // id must be a positive integer
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const { title, description, priority, completed } = req.body;

  if (priority !== undefined && !priorities.includes(priority)) {
    return res.status(400).json({ error: 'Invalid input: priority' }); 
  }

  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({ error: 'Invalid input: title' }); 
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid input: completed' }); 
  }

  if (title !== undefined) task.title = title.trim();
  if (description !== undefined) task.description = description;
  if (priority !== undefined) task.priority = priority;
  if (completed !== undefined) task.completed = completed;

  return res.status(200).json(task);
});


// DELETE /api/tasks/:id - delete task
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  tasks.splice(index, 1);
  res.status(204).send();
});

// PATCH /api/tasks/:id/toggle - toggle completed
router.patch('/:id/toggle', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  task.completed = !task.completed;
  res.json(task);
});



module.exports = router;
