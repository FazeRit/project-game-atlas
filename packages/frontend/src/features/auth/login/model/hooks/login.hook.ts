import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from "axios";
import { ROUTES, IApiResponse, IApiErrorResponse } from "@/shared";
import { loginApi } from "../../api";
import { ILoginRequestDto } from "../interfaces/login-request.interface";
import { IJwtTokenResponse } from "@/entities/user/model/interfaces/jwt-response.interface";
import { useUserStore, getUser } from "@/entities/user"; 

export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const {
        setAccessToken,
        setIsAuthenticated,
        setUser
    } = useUserStore();

    return useMutation<
        IApiResponse<IJwtTokenResponse>, 
        AxiosError<IApiErrorResponse>, 
        ILoginRequestDto
    >({
        mutationFn: loginApi,
        mutationKey: ['login'],
        onSuccess: async (response) => {
            setAccessToken(response.data.accessToken);
                
            const userData = await queryClient.fetchQuery({
                queryKey: ['user'],
                queryFn: getUser
            });

            setUser(userData);
            setIsAuthenticated(true);

            toast.success('Login successful!');

            navigate(ROUTES.CATALOG);
        },
        onError: (error) => {
            const message = error.response?.data?.data?.message;

            if (Array.isArray(message)) {
                message.forEach(msg => toast.error(msg));
            } else if (typeof message === 'string') {
                toast.error(message);
            } else {
                toast.error('Login failed.');
            }
        },
    });
};