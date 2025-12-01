import { lazy } from 'react';

export const GameDetailsPageAsync = lazy(() =>
    import('./game-details.page.js')
        .then(({
            GameDetailsPage
        }) => ({ default: GameDetailsPage })),
);