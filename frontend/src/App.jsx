import { useEffect, useMemo, useState } from 'react';
import { listTasks, createTask, updateTask, deleteTask, toggleTask } from './services/api';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';

export default function App() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all'); // all | completed | pending
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await listTasks();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        setErr(e.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'completed') return items.filter(t => t.completed);
    if (filter === 'pending') return items.filter(t => !t.completed);
    return items;
  }, [items, filter]);

  async function handleCreate(data) {
    const created = await createTask(data);
    setItems(prev => [...prev, created]);
  }
  async function handleUpdate(id, data) {
    const up = await updateTask(id, data);
    setItems(prev => prev.map(t => (t.id === id ? up : t)));
  }
  async function handleDelete(id) {
    if (!confirm('Delete this task?')) return;
    await deleteTask(id);
    setItems(prev => prev.filter(t => t.id !== id));
  }
  async function handleToggle(id) {
    const up = await toggleTask(id);
    setItems(prev => prev.map(t => (t.id === id ? up : t)));
  }

  if (loading) return <div className="container">Loading…</div>;
  if (err) return <div className="container" style={{color:'#b00020'}}>{err}</div>;

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm onCreate={handleCreate} />
      <TaskFilter value={filter} onChange={setFilter} />
      <TaskList
        items={filtered}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </div>
  );
}
