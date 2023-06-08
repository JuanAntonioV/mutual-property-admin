import { getDocs } from 'firebase/firestore';
import { getFirebaseData } from '../helpers/FirebaseHelper';
import { userCollection } from '../stores/collections';

export const getUsersApi = async () => {
    try {
        const docs = await getDocs(userCollection);
        const data = await getFirebaseData(docs);
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};
