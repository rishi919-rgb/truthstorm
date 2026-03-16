import { createContext, useState, useContext, useEffect } from 'react';
import { apiLogin, apiSignup } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session on initial load
        const storedUser = localStorage.getItem('truthstorm_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (userData) => {
        const data = await apiLogin(userData);
        setUser(data.user);
        localStorage.setItem('truthstorm_user', JSON.stringify(data.user));
        localStorage.setItem('truthstorm_token', data.token);
    };

    const signup = async (userData) => {
        const data = await apiSignup(userData);
        setUser(data.user);
        localStorage.setItem('truthstorm_user', JSON.stringify(data.user));
        localStorage.setItem('truthstorm_token', data.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('truthstorm_user');
        localStorage.removeItem('truthstorm_token');
    };

    const value = {
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
