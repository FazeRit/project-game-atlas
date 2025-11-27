import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { ROUTES, IApiResponse, IApiErrorResponse } from "@/shared";
import { registerApi } from "../../api/register.api";
import { IRegisterRequestDto } from "../interfaces";
import { getUser, useUserStore } from "@/entities";
import { IJwtTokenResponse } from "@/entities/user/model/interfaces/jwt-response.interface";

export const useRegister = () => {
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
        IRegisterRequestDto
    >({
        mutationFn: registerApi,
        mutationKey: ['register'],

        onSuccess: async (response) => {
            setAccessToken(response.data.accessToken);
                
            const userData = await queryClient.fetchQuery({
                queryKey: ['user'],
                queryFn: getUser 
            });

            setUser(userData); 
            setIsAuthenticated(true);

            toast.success('Реєстрація успішна! Ласкаво просимо.');

            navigate(`/${ROUTES.PROFILE_INIT}`, {
                replace: true
            });
        },
        
        onError: () => {
            toast.error('Не вдалося зареєструватися. Спробуйте ще раз.');
        },
    });
};