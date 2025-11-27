import { Route, Routes } from 'react-router-dom';
import { LoginPageAsync, RegisterPageAsync } from '@/pages'; 
import { ROUTES } from '@/shared';
import { PublicRoute } from './public-route';
import { ProtectedRoute } from './protected-route';
import { ForgotPasswordPageAsync } from '@/pages/auth/forgot-password';
import { VerifyForgotPasswordPageAsync } from '@/pages/auth/verify-forgot-password';
import { ResetPasswordPageAsync } from '@/pages/auth/reset-password';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path={ROUTES.LOGIN} element={<LoginPageAsync />} />
                <Route path={ROUTES.REGISTER} element={<RegisterPageAsync />} />
                <Route path={ROUTES.FORGET_PASSWORD} element={<ForgotPasswordPageAsync />} />
                <Route path={ROUTES.VERIFY_FORGOT_PASSWORD} element={<VerifyForgotPasswordPageAsync />} />
                <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPageAsync />} />
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