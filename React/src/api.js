import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Your Django API URL

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;