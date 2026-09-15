import axios from 'axios';

const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

export const canvasApi = {
  create: (payload) =>
    client.post('/canvases', payload).then((res) => res.data.data),

  get: (id) =>
    client.get(`/canvases/${id}`).then((res) => res.data.data),

  update: (id, payload) =>
    client.put(`/canvases/${id}`, payload).then((res) => res.data.data),

  remove: (id) =>
    client.delete(`/canvases/${id}`).then((res) => res.data),
};