import axios from 'axios';

const API = axios.create({ baseURL: 'https://expense-tracker-mern-backend-2.onrender.com/api' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers['x-auth-token'] = localStorage.getItem('token');
  }
  return req;
});

export default API;