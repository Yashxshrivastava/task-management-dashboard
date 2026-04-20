export default function TaskModal({ isOpen, onClose, onSave, formData, setFormData, isEditing }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="modal-bg">
      <div className="modal-box">
        <h2>{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
        
        <form onSubmit={handleSubmit}>
          <input 
            required 
            type="text" 
            placeholder="Task Title" 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
          />
          <textarea 
            placeholder="Description" 
            value={formData.description} 
            onChange={(e) => setFormData({...formData, description: e.target.value})} 
          />
          <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input 
            type="datetime-local" 
            value={formData.due_date} 
            onChange={(e) => setFormData({...formData, due_date: e.target.value})} 
          />
          
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="btn-light">Cancel</button>
            <button type="submit" className="btn-blue">Save Task</button>
          </div>
        </form>

      </div>
    </div>
  );
}