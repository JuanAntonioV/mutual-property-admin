import api from '../lib/client-api';

export const getAllGalleryApi = async () => {
    try {
        const response = await api.get('gallery');
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const deleteGalleryApi = async (id) => {
    try {
        const response = await api.delete(`gallery/${id}`);
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const updateGalleryApi = async ({ id, payload }) => {
    try {
        const response = await api.patch(`gallery/${id}`, payload);
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const addNewGalleryApi = async (data) => {
    try {
        const response = await api.post('gallery', data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
