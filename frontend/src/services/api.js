import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to inject Token & Tenant ID
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('edumanage_token');
  const activeTenantId = localStorage.getItem('edumanage_tenant_id') || '1';

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  if (activeTenantId) {
    config.headers['X-Tenant-ID'] = activeTenantId;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error?.response?.data || { message: error.message });
  }
);

export default api;
