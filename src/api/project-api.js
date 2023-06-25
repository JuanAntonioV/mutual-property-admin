import api from '../lib/client-api';

export const getAllProjectApi = async () => {
    try {
        const response = await api.get('projects');
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const getProjectDetailApi = async (id) => {
    try {
        const response = await api.get(`projects/${id}`);
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const createProjectApi = async (payload) => {
    try {
        const response = await api.post('projects', payload, {
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

export const updateProjectApi = async ({ projectId, data }) => {
    try {
        console.log('data', data);
        const response = await api.post(`projects/${projectId}/update`, data, {
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

export const getAllPropertyProjectApi = async (projectId) => {
    try {
        const response = await api.get(`projects/${projectId}/products`);
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
