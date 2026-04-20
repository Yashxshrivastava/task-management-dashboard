export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className={`task-card ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <h3>{task.title}</h3>
          <span className={`badge ${task.priority}`}>{task.priority}</span>
          {task.is_overdue && <span className="badge danger">Overdue</span>}
        </div>
        <p>{task.description}</p>
        {task.due_date && <small>Due: {new Date(task.due_date).toLocaleString()}</small>}
      </div>
      <div className="task-actions">
        <button onClick={() => onToggle(task)} className="btn-secondary">
          {task.status === 'completed' ? 'Mark Pending' : 'Mark Complete'}
        </button>
        <button onClick={() => onEdit(task)} className="btn-secondary">Edit</button>
        <button onClick={() => onDelete(task.id)} className="btn-danger">Delete</button>
      </div>
    </div>
  );
}