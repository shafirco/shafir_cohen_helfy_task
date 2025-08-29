import { useEffect, useRef, useState } from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ items, onUpdate, onDelete, onToggle }) {
  if (!items.length) return <div className="muted">No tasks yet.</div>;

  const [idx, setIdx] = useState(0);
  const [anim, setAnim] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    // Advance one item every 4s with a short transition
    timer.current = setInterval(() => {
      setAnim(true);
      setTimeout(() => {
        setIdx(i => (i + 1) % items.length);
        setAnim(false);
      }, 400); // must match .slide transition duration
    }, 4000);

    return () => clearInterval(timer.current);
  }, [items.length]);

  const current = items[idx];

  return (
    <div className="carousel">
      <div className={`slide ${anim ? 'animating' : ''}`}>
        <TaskItem
          task={current}
          onUpdate={(data) => onUpdate(current.id, data)}
          onDelete={() => onDelete(current.id)}
          onToggle={() => onToggle(current.id)}
        />
      </div>
    </div>
  );
}
