import { lazy } from 'react';

export const ResetPasswordPageAsync = lazy(() =>
    import('./reset-password.page.js')
        .then(({
            ResetPasswordPage
        }) => ({ default: ResetPasswordPage })),
);