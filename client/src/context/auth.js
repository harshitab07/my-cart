import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [ auth, setAuth ] = useState({
        user: null,
        token: ""
    });

    // default axios
    axios.defaults.headers.common['Authorization'] = auth?.token;

    useEffect(() => {
        const data = localStorage.getItem('auth');

        if (data) {
            const parsed = JSON.parse(data);
            setAuth({
                ...auth,
                user: parsed.user,
                token: parsed.token
            })
        }
    // eslint-disable-next-line
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook
export const useAuth = () => useContext(AuthContext);
