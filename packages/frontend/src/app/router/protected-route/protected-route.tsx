import { useGetUser, useUserStore } from '@/entities';
import { ROUTES } from '@/shared';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    useGetUser();

    const isAuthenticated = useUserStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={`${ROUTES.LOGIN}`} replace />;
    }

    return <Outlet />;
};