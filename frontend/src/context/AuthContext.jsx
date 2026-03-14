import { createContext, useState, useContext, useEffect } from 'react';

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

    const login = (userData) => {
        // Simulated login for Phase 9
        const dummyUser = { id: 1, email: userData.email, name: 'Investigator' };
        setUser(dummyUser);
        localStorage.setItem('truthstorm_user', JSON.stringify(dummyUser));
    };

    const signup = (userData) => {
        // Simulated signup for Phase 9
        const dummyUser = { id: 2, email: userData.email, name: userData.name };
        setUser(dummyUser);
        localStorage.setItem('truthstorm_user', JSON.stringify(dummyUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('truthstorm_user');
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
