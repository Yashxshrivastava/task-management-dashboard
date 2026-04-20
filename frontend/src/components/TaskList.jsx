export default function TaskList({ tasks, onToggleStatus, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p className="no-tasks">No tasks found.</p>;
  }

  return (
    <div className="list-container">
      {tasks.map((task) => (
        <div key={task.id} className={`task-card ${task.status === 'completed' ? 'is-completed' : ''}`}>
          
          <div className="task-info">
            <div className="task-header">
              <h3>{task.title}</h3>
              <span className={`tag tag-${task.priority}`}>{task.priority}</span>
              {task.is_overdue && <span className="tag tag-red">Overdue</span>}
            </div>
            <p className="task-desc">{task.description}</p>
            {task.due_date && <small>Due: {new Date(task.due_date).toLocaleString()}</small>}
          </div>

          <div className="task-buttons">
            <button className="btn-light" onClick={() => onToggleStatus(task)}>
              {task.status === 'completed' ? 'Mark Pending' : 'Mark Complete'}
            </button>
            <button className="btn-light" onClick={() => onEdit(task)}>Edit</button>
            <button className="btn-red" onClick={() => onDelete(task.id)}>Delete</button>
          </div>
          
        </div>
      ))}
    </div>
  );
}