import { lazy } from 'react';

export const PersonalLibraryGameDetailsPageAsync = lazy(() =>
    import('./personal-library-game-details.page.js')
        .then(({
            PersonalLibraryGameDetailsPage
        }) => ({ default: PersonalLibraryGameDetailsPage })),
);