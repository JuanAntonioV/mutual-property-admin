import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/auth/login/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import MainLayout from '../layouts/MainLayout';
import NotFoundPage from '../pages/notFound/NotFoundPage';
import AdminPage from '../pages/admin/AdminPage';
import PropertyPage from '../pages/property/PropertyPage';
import SubscriptionPage from '../pages/subscriptions/SubscriptionPage';
import ContactPage from '../pages/ContactPage';
import ProfilePage from '../pages/profiles/ProfilePage';
import AdminDetailPage from '../pages/admin/AdminDetailPage';
import CreateAdminPage from '../pages/admin/CreateAdminPage';
import ForgotPasswordPage from '../pages/auth/forgot-password/ForgotPasswordPage';
import CreatePropertyPage from '../pages/property/create/CreatePropertyPage';
import ProjectPage from '../pages/projects/ProjectPage';
import CreateProjectPage from '../pages/projects/create/CreateProjectPage';
import ProjectDetailPage from '../pages/projects/edit/ProjectDetailPage';
import {
    AuthenticatedMiddleware,
    GuestMiddleware,
} from './middleware/AuthMiddleware';
import useAuth from '../hooks/useAuth';
import ResetPasswordPage from '../pages/auth/reset-password/ResetPasswordPage';
import EditPropertyPage from '../pages/property/edit/EditPropertyPage';

export default function Router() {
    const { isLoading, isAuthLoading, user } = useAuth();

    return (
        <Routes>
            <Route
                element={
                    <GuestMiddleware
                        isLoading={isLoading}
                        isAuthLoading={isAuthLoading}
                        user={user}
                    />
                }
            >
                <Route path='/login' element={<LoginPage />} />
                <Route
                    path='/forgot-password'
                    element={<ForgotPasswordPage />}
                />
                <Route path='/reset-password' element={<ResetPasswordPage />} />
            </Route>

            <Route
                element={
                    <AuthenticatedMiddleware
                        isAuthLoading={isAuthLoading}
                        isLoading={isLoading}
                        user={user}
                    />
                }
            >
                <Route path='/' element={<Navigate to='/dashboard' />} />
                <Route element={<MainLayout />}>
                    <Route path='/dashboard' element={<DashboardPage />} />

                    <Route path='/projects' element={<ProjectPage />} />
                    <Route
                        path='/projects/:id'
                        element={<ProjectDetailPage />}
                    />
                    <Route
                        path='/projects/create'
                        element={<CreateProjectPage />}
                    />

                    <Route path='/property' element={<PropertyPage />} />
                    <Route
                        path='/property/:id'
                        element={<EditPropertyPage />}
                    />
                    <Route
                        path='/property/create/:category'
                        element={<CreatePropertyPage />}
                    />

                    <Route
                        path='/subscriptions'
                        element={<SubscriptionPage />}
                    />
                    <Route path='/contacts' element={<ContactPage />} />
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path='/admins' element={<AdminPage />} />
                    <Route path='/admins/:id' element={<AdminDetailPage />} />
                    <Route
                        path='/admins/create'
                        element={<CreateAdminPage />}
                    />
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </Route>

            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    );
}
