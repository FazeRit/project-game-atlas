import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from './providers/query';
import { AppRoutes } from './router/app.routes';
import { ToastContainer } from 'react-toastify';

export const App = () => {
    return (
        <QueryProvider>
            <BrowserRouter>
                <AppRoutes />
                <ToastContainer 
                    position="top-right"
                    autoClose={5000}
                    theme="dark"
                    closeOnClick
                    pauseOnHover
                    hideProgressBar={true}
                />
            </BrowserRouter>
        </QueryProvider>
    );
};