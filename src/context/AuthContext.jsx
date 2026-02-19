import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session (if any) or validate token
        // For simplicity, we just check if user data exists in local storage
        const storedUser = localStorage.getItem('netflix_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const signup = async (items) => {
        const { email, password, name } = items;
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }
            return true;
        } catch (error) {
            console.error("Signup error:", error);
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Store user data
            localStorage.setItem('netflix_user', JSON.stringify(data.user));
            setUser(data.user);
            return true;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('netflix_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
