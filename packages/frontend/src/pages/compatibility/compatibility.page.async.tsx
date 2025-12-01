import { lazy } from 'react';

export const CompatibilityPageAsync = lazy(() =>
    import('./compatibility.page.js')
        .then(({
            CompatibilityPage
        }) => ({ default: CompatibilityPage })),
);