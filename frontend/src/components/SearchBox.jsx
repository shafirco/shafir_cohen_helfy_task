export default function SearchBox({ value, onChange }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search title or description…"
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Search tasks"
      />
    </div>
  );
}
