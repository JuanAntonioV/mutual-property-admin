import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import MainLayout from '../layouts/MainLayout';
import NotFoundPage from '../pages/notFound/NotFoundPage';

export default function Router() {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />

            <Route element={<MainLayout />}>
                <Route path='/' element={<DashboardPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Route>

            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    );
}
