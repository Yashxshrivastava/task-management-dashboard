import { useState, useCallback } from 'react';
import axiosClient from '../api/axiosClient';

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, overdue: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTasks = useCallback(async (filters = {}, page = 1) => {
    setLoading(true);
    setError(null);
    try {
      // Build query params for filtering/sorting
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.sortBy) params.append('sort_by', filters.sortBy);

      params.append('page', page);

      const response = await axiosClient.get(`/tasks/?${params.toString()}`);
      setTasks(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 5));
    } catch (err) {
      setError('Failed to fetch tasks. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);


  const fetchStats = useCallback(async () => {
    try {
      const response = await axiosClient.get('/dashboard-stats/');
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch stats', err);
    }
  }, []);

  const addTask = async (taskData) => {
    try {
      await axiosClient.post('/tasks/', taskData);
      return true; // Success
    } catch (err) {
      setError('Failed to add task.');
      return false; // Failed
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      await axiosClient.patch(`/tasks/${id}/`, taskData);
      return true;
    } catch (err) {
      setError('Failed to update task.');
      return false;
    }
  };

  const deleteTask = async (id) => {
    try {
      await axiosClient.delete(`/tasks/${id}/`);
      return true;
    } catch (err) {
      setError('Failed to delete task.');
      return false;
    }
  };

  return {
    tasks, stats, loading, error, totalPages,
    fetchTasks, fetchStats, addTask, updateTask, deleteTask
  };
};