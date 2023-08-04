import api from '../lib/client-api';

export const getAllNewsApi = async () => {
    try {
        const res = await api.get('news');
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const getNewssDetailApi = async (id) => {
    try {
        const res = await api.get(`news/${id}`);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const createNewsApi = async (data) => {
    try {
        const res = await api.post('news', data);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const updateNewsApi = async ({ id, payload }) => {
    try {
        const res = await api.put(`news/${id}`, payload);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const deleteNewsApi = async (id) => {
    try {
        const res = await api.delete(`news/${id}`);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
