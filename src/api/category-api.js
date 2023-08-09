import api from '../lib/client-api';

export const getAllCategoryApi = async () => {
    try {
        const res = await api.get('categories');
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const getAllSubCategoriesApi = async () => {
    try {
        const res = await api.get('sub-categories');
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
