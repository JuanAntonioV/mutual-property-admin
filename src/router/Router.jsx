import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import MainLayout from '../layouts/MainLayout';
import NotFoundPage from '../pages/notFound/NotFoundPage';
import AdminPage from '../pages/admin/AdminPage';
import PropertyPage from '../pages/property/PropertyPage';
import SubscriptionPage from '../pages/subscriptions/SubscriptionPage';
import ContactPage from '../pages/ContactPage';
import ProfilePage from '../pages/profiles/ProfilePage';

export default function Router() {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />

            <Route element={<MainLayout />}>
                <Route path='/' element={<DashboardPage />} />
                <Route path='/property' element={<PropertyPage />} />
                <Route path='/subscriptions' element={<SubscriptionPage />} />
                <Route path='/contacts' element={<ContactPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/admins' element={<AdminPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Route>

            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    );
}
