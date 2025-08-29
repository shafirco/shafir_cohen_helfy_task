const express = require('express');
const validateTask = require('../middleware/validateTask');
const validateId = require('../middleware/validateId');

const router = express.Router();

// in-memory store (as required)
const priorities = ['low', 'medium', 'high'];
let nextId = 1;
/** @type {Array<{id:number ,title:string ,description:string ,completed:boolean ,createdAt:string ,priority:'low'|'medium'|'high' }>} */
const tasks = [];

// GET all
router.get('/', (req, res) => {
  res.json(tasks);
});

// POST create
router.post('/', validateTask, (req, res) => {
  const { title, description = '', priority, dueDate = null } = req.body;
  const task = {
    id: nextId++,
    title,
    description,
    completed: false,
    createdAt: new Date().toISOString(),
    priority,
    dueDate: dueDate ? new Date(dueDate).toISOString() : null
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT update (full/partial fields allowed)
router.put('/:id', validateId, (req, res) => {
  const id = req.taskId;
  const t = tasks.find(x => x.id === id);
  if (!t) return res.status(404).json({ error: 'Task not found' });

  const { title, description, priority, completed, dueDate } = req.body || {};

  if (title !== undefined && (!title || typeof title !== 'string')) {
    return res.status(400).json({ error: 'Invalid "title"' });
  }
  if (priority !== undefined && !priorities.includes(priority)) {
    return res.status(400).json({ error: 'Invalid "priority"' });
  }
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid "completed"' });
  }
  if (dueDate !== undefined) {
    if (dueDate !== null) {
      const ts = Date.parse(dueDate);
      if (Number.isNaN(ts)) {
        return res.status(400).json({ error: 'Invalid "dueDate"' });
      }
      t.dueDate = new Date(dueDate).toISOString();
    } else {
      t.dueDate = null; // allow clearing due date
    }
  }

  if (title !== undefined) t.title = title;
  if (description !== undefined) t.description = description;
  if (priority !== undefined) t.priority = priority;
  if (completed !== undefined) {
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Invalid "completed"' });
    }
    t.completed = completed;
  }

  res.json(t);
});

// DELETE
router.delete('/:id',validateId, (req, res) => {
  const id = Number(req.params.id);
  const idx = tasks.findIndex(x => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  tasks.splice(idx, 1);
  res.status(204).end();
});

// PATCH toggle (required by assignment)
router.patch('/:id/toggle',validateId, (req, res) => {
  const id = Number(req.params.id);
  const t = tasks.find(x => x.id === id);
  if (!t) return res.status(404).json({ error: 'Task not found' });
  t.completed = !t.completed;
  res.json(t);
});

module.exports = router;
