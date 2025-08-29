import { useEffect, useMemo, useState } from 'react';
import { listTasks, createTask, updateTask, deleteTask, toggleTask } from './services/api';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import SearchBox from './components/SearchBox';
import SortControl from './components/SortControl';

export default function App() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('created_desc'); // new
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

    // filter
    if (filter === 'completed') arr = arr.filter(t => t.completed);
    else if (filter === 'pending') arr = arr.filter(t => !t.completed);

    // search
    const q = query.trim().toLowerCase();
    if (q) {
      arr = arr.filter(t =>
        (t.title || '').toLowerCase().includes(q) ||
        (t.description || '').toLowerCase().includes(q)
      );
    }

    // sort
    const pOrder = { high: 3, medium: 2, low: 1 }; // for priority sort
    const by = {
      created_desc: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      created_asc:  (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      due_asc:      (a, b) => (a.dueDate ? new Date(a.dueDate) : Infinity) - (b.dueDate ? new Date(b.dueDate) : Infinity),
      due_desc:     (a, b) => (b.dueDate ? new Date(b.dueDate) : -Infinity) - (a.dueDate ? new Date(a.dueDate) : -Infinity),
      title_asc:    (a, b) => (a.title || '').localeCompare(b.title || ''),
      title_desc:   (a, b) => (b.title || '').localeCompare(a.title || ''),
      priority_high:(a, b) => (pOrder[b.priority] || 0) - (pOrder[a.priority] || 0),
      priority_low: (a, b) => (pOrder[a.priority] || 0) - (pOrder[b.priority] || 0),
    };
    const cmp = by[sort] || by.created_desc;
    return [...arr].sort(cmp);
  }, [items, filter, query, sort]);

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
          <SortControl value={sort} onChange={setSort} />
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
