import { useUserStore } from '@/entities';
import { ROUTES } from '@/shared';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = () => {
    const isAuthenticated = useUserStore((state) => state.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to={ROUTES.CATALOG} replace />;
    }

    return <Outlet />;
};