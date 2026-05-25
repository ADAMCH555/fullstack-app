import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "/api/users";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);

    // Update axios default header whenever token changes
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("token", token);
            // Optionally fetch user profile to populate user state
            fetchProfile();
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
            setUser(null);
            setLoading(false);
        }
    }, [token]);

    const fetchProfile = async () => {
        try {
            const res = await axios.get(`${API_URL}/profile`);
            setUser(res.data);
        } catch (error) {
            console.error("Failed to fetch profile", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        const res = await axios.post(API_URL, userData);
        setToken(res.data.token);
        setUser(res.data);
    };

    const login = async (userData) => {
        const res = await axios.post(`${API_URL}/login`, userData);
        setToken(res.data.token);
        setUser(res.data);
    };

    const updateProfile = async (profileData) => {
        const res = await axios.put(`${API_URL}/profile`, profileData);
        setUser(res.data);
        return res.data;
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, register, login, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
