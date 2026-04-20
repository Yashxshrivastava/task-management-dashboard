export default function TaskFilters({ status, setStatus, priority, setPriority, sortBy, setSortBy }) {
  return (
    <div className="filters-container">
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="-created_at">Newest First</option>
        <option value="due_date">Due Date (Asc)</option>
        <option value="-due_date">Due Date (Desc)</option>
        <option value="-priority">Priority (High to Low)</option>
      </select>
    </div>
  );
}