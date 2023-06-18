import api from '../lib/client-api';

export const getStatApi = async () => {
    try {
        const res = await api.get('stats');
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
