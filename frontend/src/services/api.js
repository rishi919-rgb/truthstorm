const API_URL = import.meta.env.VITE_API_URL || 'https://truthstorm.onrender.com/api';

const getHeaders = () => {
    const token = localStorage.getItem('truthstorm_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

// AUTH
export const apiSignup = async (data) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Signup failed');
    return json;
};

export const apiLogin = async (data) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Login failed');
    return json;
};

// INVESTIGATIONS
export const apiCreateInvestigation = async (data) => {
    const res = await fetch(`${API_URL}/investigations`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to submit investigation');
    return json;
};

export const apiGetInvestigations = async () => {
    const res = await fetch(`${API_URL}/investigations`, {
        headers: getHeaders(),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch investigations');
    return json;
};

export const apiDeleteInvestigation = async (id) => {
    const res = await fetch(`${API_URL}/investigations/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to delete investigation');
    return json;
};
