import api from '../lib/client-api';

export const loginApi = async (data) => {
    try {
        const res = await api.post('auth/login', data);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const logoutApi = async (token) => {
    try {
        const res = await api.post(
            'auth/logout',
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const getUserDataApi = async () => {
    try {
        const res = await api.get('auth/me');
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const forgotPasswordApi = async (data) => {
    try {
        const res = await api.post('auth/forgot-password', data);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const resetPasswordApi = async (data) => {
    try {
        const res = await api.post('auth/reset-password', data);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
