import { lazy } from 'react';

export const PersonalLibraryPageAsync = lazy(() =>
    import('./personal-library.page.js')
        .then(({
            PersonaLibraryPage
        }) => ({ default: PersonaLibraryPage })),
);