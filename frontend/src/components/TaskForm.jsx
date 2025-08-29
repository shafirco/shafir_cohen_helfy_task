import { useState } from 'react';

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [priority, setPrio] = useState('medium');

  async function submit(e) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    await onCreate({ title: t, description, priority });
    setTitle('');
    setDesc('');
    setPrio('medium');
  }

  return (
    <form onSubmit={submit} className="form">
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDesc(e.target.value)}
      />
      <select value={priority} onChange={e => setPrio(e.target.value)}>
        <option>low</option>
        <option>medium</option>
        <option>high</option>
      </select>
      <button type="submit" className="primary">Add Task</button>
    </form>
  );
}
