import { useQuery } from '@tanstack/react-query';
import { createContext, useEffect, useState } from 'react';
import { getAllCategoryApi } from '../api/category-api';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const {
        isLoading: isCategoryLoading,
        isError: isCategoryError,
        error: categoryError,
    } = useQuery(['categories'], getAllCategoryApi, {
        refetchOnWindowFocus: false,
        select: (res) => res.results,
        onSuccess: (data) => {
            setCategories(data);
        },
    });

    useEffect(() => {
        if (isCategoryLoading) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [isCategoryLoading]);

    useEffect(() => {
        if (isCategoryError) {
            setIsError(true);
            setErrorMessage(categoryError.message);
        } else {
            setIsError(false);
            setErrorMessage('');
        }
    }, [isCategoryError, categoryError]);

    return (
        <StoreContext.Provider
            value={{
                categories,
                isLoading,
                isError,
                errorMessage,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContext;
