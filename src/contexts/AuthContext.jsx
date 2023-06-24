import { createContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserDataApi } from '../api/auth-api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const { isLoading: isAuthLoading } = useQuery(
        ['user', token],
        getUserDataApi,
        {
            retry: 0,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            select: (res) => res.results,
            onSuccess: (res) => {
                setUser(res);
                setIsAuth(true);
                setIsLoading(false);
            },
            onError: (err) => {
                setIsError(true);
                setErrorMessage(err.message);
                setIsLoading(false);
            },
            onSettled: () => {
                setIsLoading(false);
            },
        }
    );

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLoading,
                isError,
                isAuth,
                setToken,
                token,
                isAuthLoading,
                error: errorMessage,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
