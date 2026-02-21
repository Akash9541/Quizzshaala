const getApiBaseUrl = () => {
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }

    if (typeof window !== 'undefined') {
        const host = window.location.hostname;
        const isLocalHost = host === 'localhost' || host === '127.0.0.1';
        if (!isLocalHost) {
            return "https://quizshaala.onrender.com/api";
        }
    }

    return "http://localhost:5001/api";
};

const API_BASE_URL = getApiBaseUrl();

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

const clearAuthState = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
};

const redirectToLoginIfNeeded = () => {
    if (typeof window === 'undefined') return;
    const publicRoutes = new Set(['/login', '/signup', '/otp-verification', '/']);
    if (!publicRoutes.has(window.location.pathname)) {
        window.location.assign('/login');
    }
};

const handleResponse = async (response) => {
    const text = await response.text();
    let data = {};
    try {
        data = text ? JSON.parse(text) : {};
    } catch {
        data = {};
    }

    if (!response.ok) {
        const error = (data && data.error) || response.statusText;
        const isAuthError =
            response.status === 401 ||
            (response.status === 403 && /invalid|expired token/i.test(String(error)));

        if (isAuthError) {
            clearAuthState();
            redirectToLoginIfNeeded();
        }

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
