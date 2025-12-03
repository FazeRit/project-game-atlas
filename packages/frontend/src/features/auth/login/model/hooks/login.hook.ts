import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from "axios";
import { ROUTES, IApiResponse, IApiErrorResponse } from "@/shared";
import { loginApi } from "../../api";
import { ILoginRequestDto } from "../interfaces/login-request.interface";
import { useUserStore, getUser } from "@/entities/user"; 

export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const {
        setIsAuthenticated,
        setUser
    } = useUserStore();

    return useMutation<
        IApiResponse<null>, 
        AxiosError<IApiErrorResponse>, 
        ILoginRequestDto
    >({
        mutationFn: loginApi,
        mutationKey: ['login'],
        onSuccess: async (response) => {
            const userData = await queryClient.fetchQuery({
                queryKey: ['user'],
                queryFn: getUser
            });

            setUser(userData.data);
            setIsAuthenticated(true);

            toast.success('Вхід виконано успішно!');

            navigate(ROUTES.CATALOG);
        },
        onError: () => {
            toast.error('Не вдалося увійти в систему.');
        },
    });
};