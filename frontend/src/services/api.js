import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if available
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

// Auth API
export const authAPI = {
    register: async (name, email, password) => {
        const response = await api.post('/auth/register', { name, email, password });
        if (response.data.success && response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        return response.data;
    },

    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.success && response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    getUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};

// Institution API
export const institutionAPI = {
    getAll: async () => {
        const response = await api.get('/institutions');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/institutions/${id}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post('/institutions', data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/institutions/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/institutions/${id}`);
        return response.data;
    }
};

// Criterion API
export const criterionAPI = {
    getAll: async () => {
        const response = await api.get('/criteria');
        return response.data;
    },

    create: async (data) => {
        const response = await api.post('/criteria', data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/criteria/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/criteria/${id}`);
        return response.data;
    }
};

// Rating API
export const ratingAPI = {
    submitAdminRatings: async (institutionId, ratings) => {
        const response = await api.post('/ratings/admin', { institutionId, ratings });
        return response.data;
    },

    getAdminRatings: async (institutionId) => {
        const response = await api.get(`/ratings/admin/${institutionId}`);
        return response.data;
    },

    submitPublicRating: async (institutionId, rating, comment) => {
        const response = await api.post('/ratings/public', { institutionId, rating, comment });
        return response.data;
    },

    getPublicRatings: async (institutionId) => {
        const response = await api.get(`/ratings/public/${institutionId}`);
        return response.data;
    }
};

export default api;
