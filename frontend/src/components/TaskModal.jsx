import { useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function TaskModal({ isOpen, onClose, onSave, formData, setFormData, isEditing }) {
  if (!isOpen) return null;
  const [modalError, setModalError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalError(null); // Clear any previous errors

    try {
        // existing API call goes here
        await axios.post('/api/tasks/', formData);
        
        // ONLY close the modal if it succeeds
        closeModal(); 
        
    } catch (error) {
        // If Django rejects it, setting the error state and Keeping the modal open
        if (error.response && error.response.data) {
            const titleError = error.response.data.title;
            setModalError(titleError ? titleError[0] : "Something went wrong. Please check your inputs.");
        } else {
            setModalError("Network error. Please try again.");
        }
    }
};

  return (
    <div className="modal-bg">
      <div className="modal-box">
        <h2>{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
        
        <form onSubmit={handleSubmit}>
          {modalError && (
              <div className="error-box" style={{ padding: '10px', fontSize: '14px', marginBottom: '16px' }}>
            {modalError}
               </div>
           )}
          
          <input 
            required 
            type="text" 
            placeholder="Task Title" 
            minLength={3}
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
          />
          <textarea 
            placeholder="Description" 
            value={formData.description} 
            onChange={(e) => setFormData({...formData, description: e.target.value})} 
            placeholder="Describe the task..."
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