import api from '../lib/client-api';

export const getAllPropertyApi = async () => {
    try {
        const res = await api.get('products');
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const getPropertyDetailApi = async ({ propertyId }) => {
    try {
        const res = await api.get(`products/${propertyId}`);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const createPropertyApi = async (data) => {
    try {
        const res = await api.post('products', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const updatePropertyApi = async ({ propertyId, data }) => {
    try {
        const res = await api.post(`products/${propertyId}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const getAllNewPostApi = async () => {
    try {
        const res = await api.get('products/new-post');
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
