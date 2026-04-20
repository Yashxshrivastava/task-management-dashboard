import { useEffect, useState } from 'react';
import { useTasks } from './hooks/useTasks';
import DashboardStats from './components/DashboardStats';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import './index.css';

export default function App() {
  const { tasks, stats, loading, error, totalPages, fetchTasks, fetchStats, addTask, updateTask, deleteTask } = useTasks();
  
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortBy, setSortBy] = useState('-created_at');

  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', priority: 'medium', due_date: '' });

  useEffect(() => {
    fetchTasks({ status: statusFilter, priority: priorityFilter, sortBy: sortBy }, currentPage);
    fetchStats();
  }, [statusFilter, priorityFilter, sortBy, currentPage, fetchTasks, fetchStats]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, priorityFilter, sortBy]);

  const handleSaveTask = async () => {
    const payload = { ...formData, due_date: formData.due_date || null };
    let success = editingTask ? await updateTask(editingTask.id, payload) : await addTask(payload);

    if (success) {
      closeModal();
      refreshData();
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    if (await updateTask(task.id, { status: newStatus })) refreshData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      if (await deleteTask(id)) refreshData();
    }
  };

  const openAddModal = () => {
    setEditingTask(null);
    setFormData({ title: '', description: '', priority: 'medium', due_date: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      due_date: task.due_date ? task.due_date.substring(0, 16) : ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  
  const refreshData = () => {
    fetchTasks({ status: statusFilter, priority: priorityFilter, sortBy: sortBy }, currentPage);
    fetchStats();
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Task Dashboard</h1>
        <button onClick={openAddModal} className="btn-blue">+ New Task</button>
      </header>

      <DashboardStats stats={stats} />

      <TaskFilters 
        status={statusFilter} setStatus={setStatusFilter}
        priority={priorityFilter} setPriority={setPriorityFilter}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      {error && <div className="error-box">{error}</div>}
      {loading && <div className="loading-text">Loading tasks...</div>}
      
      {!loading && (
        <>
          <TaskList 
            tasks={tasks} 
            onToggleStatus={handleToggleStatus} 
            onEdit={openEditModal} 
            onDelete={handleDelete} 
          />
          
          {/* 5. Add Pagination Controls Here */}
          {totalPages > 0 && (
            <div className="pagination">
              <button 
                className="btn-light" 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Previous
              </button>
              
              <span className="page-indicator">
                Page {currentPage} of {totalPages}
              </span>
              
              <button 
                className="btn-light" 
                disabled={currentPage === totalPages} 
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onSave={handleSaveTask}
        formData={formData}
        setFormData={setFormData}
        isEditing={!!editingTask}
      />
    </div>
  );
}