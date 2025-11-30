import { lazy } from 'react';

export const CatalogPageAsync = lazy(() =>
    import('./catalog.page.js')
        .then(({
            CatalogPage
        }) => ({ default: CatalogPage })),
);