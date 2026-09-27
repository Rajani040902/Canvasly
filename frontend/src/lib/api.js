import axios from 'axios';

const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const canvasApi = {
  list: () => client.get('/canvases').then((res) => res.data.data),

  create: (payload) =>
    client.post('/canvases', payload).then((res) => res.data.data),

  get: (id) =>
    client.get(`/canvases/${id}`).then((res) => res.data.data),

  update: (id, payload) =>
    client.put(`/canvases/${id}`, payload).then((res) => res.data.data),

  remove: (id) =>
    client.delete(`/canvases/${id}`).then((res) => res.data),
};

export const authApi = {
  register: (payload) => client.post('/auth/register', payload).then((res) => res.data.data),
  login: (payload) => client.post('/auth/login', payload).then((res) => res.data.data),
};