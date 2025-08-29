const BASE = 'http://localhost:4000/api/tasks';

export async function listTasks() {
  const r = await fetch(BASE);
  if (!r.ok) throw new Error('Failed to load tasks');
  return r.json();
}

export async function createTask(data) {
  const r = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error('Create failed');
  return r.json();
}

export async function updateTask(id, data) {
  const r = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error('Update failed');
  return r.json();
}

export async function deleteTask(id) {
  const r = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!r.ok) throw new Error('Delete failed');
}

export async function toggleTask(id) {
  const r = await fetch(`${BASE}/${id}/toggle`, { method: 'PATCH' });
  if (!r.ok) throw new Error('Toggle failed');
  return r.json();
}
