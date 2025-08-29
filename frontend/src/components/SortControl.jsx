export default function SortControl({ value, onChange }) {
  return (
    <div className="sort">
      <select value={value} onChange={e => onChange(e.target.value)} aria-label="Sort tasks">
        <option value="created_desc">Created (newest)</option>
        <option value="created_asc">Created (oldest)</option>
        <option value="due_asc">Due date (soonest)</option>
        <option value="due_desc">Due date (latest)</option>
        <option value="title_asc">Title (A→Z)</option>
        <option value="title_desc">Title (Z→A)</option>
        <option value="priority_high">Priority (high→low)</option>
        <option value="priority_low">Priority (low→high)</option>
      </select>
    </div>
  );
}
