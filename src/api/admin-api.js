import api from '../lib/client-api';

export const getAllAdmins = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const changePasswordApi = async ({ data, token }) => {
    try {
        const res = await api.post('change-password', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
export const updateProfileApi = async ({ data, token }) => {
    try {
        const res = await api.post('profile', data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
