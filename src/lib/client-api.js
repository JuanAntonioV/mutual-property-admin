import axios from 'axios';

const MODE = import.meta.env.VITE_ENV_MODE;
const BASE_URL_LOCAL = import.meta.env.VITE_API_ADMIN_LOCAL_URL;
const BASE_URL_PROD = import.meta.env.VITE_API_ADMIN_PROD_URL;

const api = axios.create({
    baseURL: MODE === 'local' ? BASE_URL_LOCAL : BASE_URL_PROD,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export default api;
