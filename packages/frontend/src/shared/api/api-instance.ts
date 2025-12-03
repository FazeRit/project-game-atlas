import { useUserStore } from '@/entities/user/model/store';
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

export const apiInstance: AxiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    timeout: 8000
});

apiInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
            const { logout } = useUserStore.getState();
            logout();
        }

        return Promise.reject(error);
    }
);