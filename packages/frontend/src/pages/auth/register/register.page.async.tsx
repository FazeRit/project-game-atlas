import { lazy } from 'react';

export const RegisterPageAsync = lazy(() =>
    import('./register.page.js')
        .then(({
            RegisterPage
        }) => ({ default: RegisterPage })),
);