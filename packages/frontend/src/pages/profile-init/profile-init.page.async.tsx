import { lazy } from 'react';

export const ProfileInitPageAsync = lazy(() =>
    import('./profile-init.page.js')
        .then(({
            ProfileInitPage
        }) => ({ default: ProfileInitPage })),
);