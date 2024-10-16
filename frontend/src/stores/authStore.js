import { create } from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,

  signIn: async (email, password, navigate) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post('http://localhost:5000/signin', { email, password }, { withCredentials: true });
      set({ user: res.data.user, isLoading: false });
      navigate('/todo');
    } catch (error) {
      set({ error: error.response?.data?.message || 'Something went wrong', isLoading: false });
      throw error;
    }
  },

  signUp: async (name, email, password, navigate) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post('http://localhost:5000/signup', { name, email, password }, { withCredentials: true });
      set({ user: res.data.user, isLoading: false });
      navigate('/todo');
    } catch (error) {
      set({ error: error.response?.data?.message || 'Something went wrong', isLoading: false });
      throw error;
    }
  },

  logout: async (navigate) => {
    try {
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      set({ user: null });
      navigate('/signin');
    } catch (error) {
      set({ error: error.response?.data?.message || 'Something went wrong' });
      throw error;
    }
  },

  checkAuth: async (navigate) => {
    try {
      const res = await axios.get('http://localhost:5000/check', { withCredentials: true });
      set({ user: res.data.user });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Something went wrong' });
      navigate('/signin');
    }
  }
}));
