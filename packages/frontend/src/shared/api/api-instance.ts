import { useUserStore } from '@/entities/user/model/store';
import axios, { AxiosError, AxiosInstance, HttpStatusCode, InternalAxiosRequestConfig } from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

export const apiInstance: AxiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    timeout: 8000
});

apiInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const { accessToken } = useUserStore.getState();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

apiInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
            const { logout, removeAccessToken } = useUserStore.getState();
            logout();
            removeAccessToken();
        }

        return Promise.reject(error);
    }
);