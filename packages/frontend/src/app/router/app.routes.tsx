import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CatalogPageAsync, LoginPageAsync, RegisterPageAsync } from '@/pages'; 
import { ROUTES } from '@/shared';
import { PublicRoute } from './public-route';
import { ProtectedRoute } from './protected-route';
import { ForgotPasswordPageAsync } from '@/pages/auth/forgot-password';
import { VerifyForgotPasswordPageAsync } from '@/pages/auth/verify-forgot-password';
import { ResetPasswordPageAsync } from '@/pages/auth/reset-password';
import { PageLoader } from '@/shared/components';
import { ProfilePageAsync } from '@/pages/profile';
import { RankingsPageAsync } from '@/pages/rankings';
import { PersonalLibraryPageAsync } from '@/pages/personal-library';

export const AppRoutes = () => {
    return (
        <Suspense fallback={<PageLoader />}>
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
                    <Route path={ROUTES.PERSONAL_LIBRARY} element={<PersonalLibraryPageAsync />} />
                    <Route path={ROUTES.PROFILE} element={<ProfilePageAsync />} />
                    <Route path={ROUTES.RANKINGS} element={<RankingsPageAsync />} />
                    <Route path={ROUTES.COMPATIBILITY} element={<div>compatibility</div>} />
                </Route>

                <Route index path={ROUTES.CATALOG} element={<CatalogPageAsync />} />
                <Route path={ROUTES.CATALOG_ITEM} element={<div>catalog item</div>} />
            </Routes>
        </Suspense>
    );
};