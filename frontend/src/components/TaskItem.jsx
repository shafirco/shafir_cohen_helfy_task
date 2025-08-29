export default function TaskItem({ task, onUpdate, onDelete, onToggle }) {
  function onEdit() {
    const nextTitle = prompt('New title:', task.title);
    if (nextTitle == null) return;
    const trimmed = nextTitle.trim();
    if (!trimmed) return;
    onUpdate({ title: trimmed });
  }

  return (
    <div className="task">
      <div className="task-header">
        <strong className="task-title">{task.title}</strong>
        <span className="task-status">[{task.completed ? 'Done' : 'Pending'}]</span>
      </div>

      <div className="task-meta">
        <small>Priority: {task.priority}</small>
        <small>Created: {new Date(task.createdAt).toLocaleString()}</small>
        {task.dueDate ? <small>Due: {new Date(task.dueDate).toLocaleDateString()}</small> : null}
      </div>

      {task.description ? <p className="task-desc">{task.description}</p> : null}

      <div className="task-actions">
        <button onClick={onToggle}>{task.completed ? 'Mark Pending' : 'Mark Done'}</button>
        <button onClick={onEdit}>Edit</button>
        <button className="danger" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
