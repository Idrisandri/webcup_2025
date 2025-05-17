// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,  // si tu utilises sessions/cookies
});

export default api;