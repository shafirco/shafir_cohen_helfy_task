export default function TaskFilter({ value, onChange }) {
  return (
    <div className="filter">
      <button
        className={value === 'all' ? 'primary' : ''}
        onClick={() => onChange('all')}
      >
        All
      </button>
      <button
        className={value === 'completed' ? 'primary' : ''}
        onClick={() => onChange('completed')}
      >
        Completed
      </button>
      <button
        className={value === 'pending' ? 'primary' : ''}
        onClick={() => onChange('pending')}
      >
        Pending
      </button>
    </div>
  );
}
