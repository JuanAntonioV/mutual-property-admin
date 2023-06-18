import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthLoading from '../../components/handler/AuthLoading';

export const GuestMiddleware = ({ isLoading, isAuthLoading, user }) => {
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/dashboard';

    if (isLoading || isAuthLoading) return <AuthLoading isLoading={true} />;

    if (user && !isLoading && !isAuthLoading)
        return <Navigate to={from} replace />;

    return !user && !isLoading && !isAuthLoading && <Outlet />;
};

export const AuthenticatedMiddleware = ({ isLoading, isAuthLoading, user }) => {
    const location = useLocation();

    if (isLoading || isAuthLoading) return <AuthLoading isLoading={true} />;

    if (!user && !isLoading && !isAuthLoading)
        return <Navigate to={'/login'} state={{ from: location }} replace />;

    return user && !isLoading && !isAuthLoading && <Outlet />;
};

export const RolePermissionsMiddleware = ({ role, user }) => {
    const location = useLocation();
    const [role1, role2] = role || ['admin', 'head'];

    return user?.role?.includes(role1) || user?.role?.includes(role2) ? (
        <Outlet />
    ) : user ? (
        <Navigate to={'/dashboard'} replace />
    ) : (
        <Navigate to={'/login'} state={{ from: location }} replace />
    );
};
