import { collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const userCollection = collection(db, 'users');
export const staffCollection = collection(db, 'staffs');

export const rolesCollection = collection(db, 'roles');

export const propertyCollection = collection(db, 'property');
export const developerCollection = collection(db, 'developers');
