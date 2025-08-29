import { useState } from 'react';

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [priority, setPrio] = useState('medium');
  const [due, setDue] = useState(''); // yyyy-mm-dd

  async function submit(e) {
    e.preventDefault();
    const t = title.trim();
    if (!t) {
      alert('Title is required'); // popup when title missing
      return;
    }
    const payload = {
      title: t,
      description,
      priority,
      dueDate: due ? new Date(due).toISOString() : null,
    };
    try {
      await onCreate(payload);
      alert('Task added'); // popup on success
      setTitle(''); setDesc(''); setPrio('medium'); setDue('');
    } catch (err) {
      alert('Failed to add task: ' + (err?.message || 'Unknown error'));
    }
  }

  return (
    <form onSubmit={submit} className="form">
      <label className="label" htmlFor="title">Title</label>
      <input
        id="title"
        placeholder="Task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <label className="label" htmlFor="desc">Description</label>
      <textarea
        id="desc"
        placeholder="Optional description"
        value={description}
        onChange={e => setDesc(e.target.value)}
      />

      <label className="label" htmlFor="prio">Priority</label>
      <select id="prio" value={priority} onChange={e => setPrio(e.target.value)}>
        <option>low</option><option>medium</option><option>high</option>
      </select>

      <label className="label" htmlFor="due">Due date</label>
      <input
        id="due"
        type="date"
        value={due}
        onChange={e => setDue(e.target.value)}
        aria-label="Due date"
      />

      <button type="submit" className="primary">Add Task</button>
    </form>
  );
}
