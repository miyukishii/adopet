import axios from 'axios';

const api = axios.create({
  baseURL: `https://adopet-production.up.railway.app`,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

export default api;