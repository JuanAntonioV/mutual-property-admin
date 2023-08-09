import api from '../lib/client-api';

export const getAllContacts = async () => {
    try {
        const res = await api.get('contacts');
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const getAllSellProperty = async () => {
    try {
        const res = await api.get('sell-property');
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
