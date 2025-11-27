import { lazy } from 'react';

export const RankingsPageAsync = lazy(() =>
    import('./rankings.page.js')
        .then(({
            RankingsPage
        }) => ({ default: RankingsPage })),
);