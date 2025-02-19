import axios from 'axios';

const API_URL = 'http://localhost:5246/api'; // ASP.NET Core API URL

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized - Redirecting to login');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token); // Persist token
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export const register = async (username, password) => {
  return await api.post('/auth/register', { username, password });
};

// On app load, check localStorage for token
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

export const fetchTasks = async () => {
  try {
    return await api.get('/tasks');
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    throw error;
  }
};

export const createTask = async (task) => {
  console.log('Task data being sent:', { task });
  return await api.post('/tasks', task);
};

export const updateTask = async (id, task) => {
  return await api.put(`/tasks/${id}`, task);
};

export const deleteTask = async (id) => {
  return await api.delete(`/tasks/${id}`);
};

export const login = async (username, password) => {
  return await api.post('/auth/login', { username, password });
};
