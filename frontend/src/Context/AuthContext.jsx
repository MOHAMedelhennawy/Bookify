import axios from 'axios';
import React, { useContext, createContext, useState, useEffect } from 'react'

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:4000/api/me", { withCredentials: true, })
            .then(res => setUser(res.data?.user || null))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
        { children }
    </AuthContext.Provider>
  )
}

export function useAuth() {
    return useContext(AuthContext);
}