import api from '../lib/client-api';

export const getAllSubscriptionApi = async () => {
    try {
        const res = await api.get('subscriptions');
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
