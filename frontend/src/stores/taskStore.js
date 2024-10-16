import { create } from 'zustand';
import axios from 'axios';

export const useTaskStore = create((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  loadTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get('http://localhost:5000/todos', { withCredentials: true });
      set({ tasks: res.data.tasks, isLoading: false });
    } catch (error) {
      set({ error: 'Error loading tasks', isLoading: false });
      throw error;
    }
  },

  addTask: async (task) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post('http://localhost:5000/todos', { task }, { withCredentials: true });
      set({ isLoading: false });
    } catch (error) {
      set({ error: 'Error adding task', isLoading: false });
      throw error;
    }
  },

  deleteTask: async (taskId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`http://localhost:5000/todos/${taskId}`, { withCredentials: true });
      set({ isLoading: false });
    } catch (error) {
      set({ error: 'Error deleting task', isLoading: false });
      throw error;
    }
  },

  updateTask: async (taskId, task) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(`http://localhost:5000/todos/${taskId}`, { task }, { withCredentials: true });
      set({ isLoading: false });
    } catch (error) {
      set({ error: 'Error updating task', isLoading: false });
      throw error;
    }
  }
}))