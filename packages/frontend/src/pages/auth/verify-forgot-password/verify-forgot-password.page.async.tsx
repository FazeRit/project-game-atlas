import { lazy } from 'react';

export const VerifyForgotPasswordPageAsync = lazy(() =>
    import('./verify-forgot-password.page.js')
        .then(({
            VerifyForgotPasswordPage
        }) => ({ default: VerifyForgotPasswordPage })),
);