export default function DashboardStats({ stats }) {
  return (
    <div className="stats-container">
      <div className="card">
        <h3>Total</h3>
        <p>{stats.total}</p>
      </div>
      <div className="card text-green">
        <h3>Completed</h3>
        <p>{stats.completed}</p>
      </div>
      <div className="card text-orange">
        <h3>Pending</h3>
        <p>{stats.pending}</p>
      </div>
      <div className="card text-red">
        <h3>Overdue</h3>
        <p>{stats.overdue}</p>
      </div>
    </div>
  );
}