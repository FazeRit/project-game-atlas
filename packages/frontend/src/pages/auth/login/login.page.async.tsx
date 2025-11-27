import { lazy } from 'react';

export const LoginPageAsync = lazy(() =>
    import('./login.page.js')
        .then(({
            LoginPage
        }) => ({ default: LoginPage })),
);