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

export const createAdminApi = async (data) => {
    try {
        const res = await api.post('super', data);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const nonActiveAdminApi = async (id) => {
    try {
        const res = await api.put(`super/${id}/non-active`);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const getAdminDetailApi = async (id) => {
    try {
        const res = await api.get(`super/${id}`);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const updateAdminProfileApi = async ({ adminId, data }) => {
    try {
        const res = await api.put(`super/${adminId}`, data);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const changeAdminPasswordApi = async ({ adminId, data }) => {
    try {
        const res = await api.put(`super/${adminId}/change-password`, data);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
