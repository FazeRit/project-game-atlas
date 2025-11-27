import { lazy } from 'react';

export const MyLibraryPageAsync = lazy(() =>
    import('./my-library.page.js')
        .then(({
            MyLibraryPage
        }) => ({ default: MyLibraryPage })),
);