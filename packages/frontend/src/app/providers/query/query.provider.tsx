import { memo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IQueryProviderProps } from './interfaces';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
        },
    },
});

export const QueryProvider = memo((props: IQueryProviderProps) => {
	const {
		children
	} = props;

    return (
        <QueryClientProvider
			client={queryClient}
		>
            {children}
        </QueryClientProvider>
    );
});