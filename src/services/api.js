const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const resolveToken = (token) => {
    if (token) return token;
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
};

const getHeaders = (token) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const resolvedToken = resolveToken(token);
    if (resolvedToken) {
        headers['Authorization'] = `Bearer ${resolvedToken}`;
    }
    return headers;
};

const handleResponse = async (response) => {
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
        const error = (data && data.error) || response.statusText;
        throw new Error(error);
    }
    return data;
};

export const api = {
    get: async (endpoint, token = null) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: getHeaders(token),
            });
            return handleResponse(response);
        } catch (error) {
            throw error;
        }
    },

    post: async (endpoint, body, token = null) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(body),
            });
            return handleResponse(response);
        } catch (error) {
            throw error;
        }
    },

    put: async (endpoint, body, token = null) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers: getHeaders(token),
                body: JSON.stringify(body),
            });
            return handleResponse(response);
        } catch (error) {
            throw error;
        }
    },

    delete: async (endpoint, token = null) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'DELETE',
                headers: getHeaders(token),
            });
            return handleResponse(response);
        } catch (error) {
            throw error;
        }
    }
};

export default api;
