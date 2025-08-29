import { useEffect, useMemo, useState } from 'react';
import { listTasks, createTask, updateTask, deleteTask, toggleTask } from './services/api';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import SearchBox from './components/SearchBox';

export default function App() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all'); // all | completed | pending
  const [query, setQuery] = useState('');      // search query
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

  const visible = useMemo(() => {
    let arr = items;
    if (filter === 'completed') arr = arr.filter(t => t.completed);
    else if (filter === 'pending') arr = arr.filter(t => !t.completed);

    const q = query.trim().toLowerCase();
    if (q) {
      arr = arr.filter(t =>
        (t.title || '').toLowerCase().includes(q) ||
        (t.description || '').toLowerCase().includes(q)
      );
    }
    return arr;
  }, [items, filter, query]);

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
  if (err) return <div className="container error">{err}</div>;

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div className="toolbar">
        <TaskForm onCreate={handleCreate} />
        <div className="controls">
          <SearchBox value={query} onChange={setQuery} />
          <TaskFilter value={filter} onChange={setFilter} />
        </div>
      </div>

      <TaskList
        items={visible}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </div>
  );
}
