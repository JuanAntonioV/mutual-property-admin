import axios from 'axios';

const MODE = import.meta.env.VITE_ENV_MODE;
const BASE_URL_LOCAL = import.meta.env.VITE_API_ADMIN_LOCAL_URL;
const BASE_URL_PROD = import.meta.env.VITE_API_ADMIN_PROD_URL;

const api = axios.create({
    baseURL: MODE === 'local' ? BASE_URL_LOCAL : BASE_URL_PROD,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
