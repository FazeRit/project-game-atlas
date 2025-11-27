import { Route, Routes } from 'react-router-dom';
import { LoginPageAsync, RegisterPageAsync } from '@/pages'; 
import { ROUTES } from '@/shared';
import { PublicRoute } from './public-route';
import { ProtectedRoute } from './protected-route';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path={ROUTES.LOGIN} element={<LoginPageAsync />} />
                <Route path={ROUTES.REGISTER} element={<RegisterPageAsync />} />
                <Route path={ROUTES.FORGET_PASSWORD} element={<div>forget password</div>} />
                <Route path={ROUTES.RESET_PASSWORD} element={<div>reset password</div>} />
            </Route>

            <Route element={<ProtectedRoute />}> 
                <Route path={ROUTES.PROFILE_INIT} element={<div>profile init</div>} />
                <Route path={ROUTES.MY_LIBRARY} element={<div>my library</div>} />
                <Route path={ROUTES.PROFILE} element={<div>profile</div>} />
                <Route path={ROUTES.RANKINGS} element={<div>rankings</div>} />
                <Route path={ROUTES.COMPATIBILITY} element={<div>compatibility</div>} />
            </Route>

            <Route path={ROUTES.CATALOG} element={<div>catalog</div>} />
            <Route path={ROUTES.CATALOG_ITEM} element={<div>catalog item</div>} />
        </Routes>
    );
};