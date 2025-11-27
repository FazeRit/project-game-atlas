import { lazy } from 'react';

export const ProfilePageAsync = lazy(() =>
    import('./profile.page.js')
        .then(({
            ProfilePage
        }) => ({ default: ProfilePage })),
);