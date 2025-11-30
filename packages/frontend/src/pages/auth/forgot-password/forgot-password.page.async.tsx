import { lazy } from 'react';

export const ForgotPasswordPageAsync = lazy(() =>
    import('./forgot-password.page.js')
        .then(({
            ForgotPasswordPage
        }) => ({ default: ForgotPasswordPage })),
);