import api from '../lib/client-api';

export const getAllPropertyApi = async () => {
    try {
        const res = await api.get('products');
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
