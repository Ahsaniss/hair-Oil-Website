import axios from 'axios';

// Create axios instance
export const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Products API
export const productsAPI = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  getFeatured: async () => {
    const response = await api.get('/products/featured');
    return response.data;
  },
  
  getByCategory: async (categoryId: string) => {
    const response = await api.get(`/products/category/${categoryId}`);
    return response.data;
  },

  create: async (productData: any) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  update: async (id: string, productData: any) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
};

// Orders API
export const ordersAPI = {
  getAll: async () => {
    const response = await api.get('/admin/orders');
    return response.data;
  },

  create: async (orderData: any) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  
  getMyOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  updateStatus: async (id: string, status: string) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },
  
  cancelOrder: async (id: string) => {
    const response = await api.put(`/orders/${id}/cancel`);
    return response.data;
  },
  
  trackOrder: async (id: string) => {
    const response = await api.get(`/orders/${id}/track`);
    return response.data;
  },
};

// Customers API
export const customersAPI = {
  getAll: async () => {
    const response = await api.get('/admin/customers');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/admin/customers/${id}`);
    return response.data;
  },

  updateStatus: async (id: string, isActive: boolean) => {
    const response = await api.put(`/admin/customers/${id}/status`, { isActive });
    return response.data;
  },

  sendEmail: async (id: string, emailData: any) => {
    const response = await api.post(`/admin/customers/${id}/email`, emailData);
    return response.data;
  },
};

// Reviews API
export const reviewsAPI = {
  create: async (reviewData: {
    productId: string;
    rating: number;
    title: string;
    comment: string;
  }) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },
  
  getByProduct: async (productId: string) => {
    const response = await api.get(`/reviews/product/${productId}`);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/admin/reviews');
    return response.data;
  },

  updateStatus: async (id: string, status: string) => {
    const response = await api.put(`/reviews/${id}/status`, { status });
    return response.data;
  },
};

export default api;