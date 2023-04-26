import axios from 'axios';
import type { AxiosInstance } from 'axios';
import router from '@/router/index';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

axios.interceptors.response.use(null, (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('TOKEN');
    if (router.currentRoute.value.name !== 'login') router.push({ name: 'login' });
  }
});

export default apiClient;
