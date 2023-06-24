import api from '../lib/client-api';

export const getAllCategoryApi = async () => {
    try {
        const res = await api.get('categories');
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
