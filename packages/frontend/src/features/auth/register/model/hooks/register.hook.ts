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

            toast.success('Registration successful!');

            navigate(`/${ROUTES.PROFILE_INIT}`, {
                replace: true
            });
        },
        
        onError: (error) => {
            const message = error.response?.data?.data?.message;

            if (Array.isArray(message)) {
                message.forEach(msg => toast.error(msg));
            } else if (typeof message === 'string') {
                toast.error(message);
            } else {
                toast.error('Registration failed.');
            }
        },
    });
};