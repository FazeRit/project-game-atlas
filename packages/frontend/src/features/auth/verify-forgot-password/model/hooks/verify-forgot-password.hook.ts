import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { AxiosError } from "axios";
import { IApiResponse, IApiErrorResponse, ROUTES } from "@/shared";
import { useNavigate } from "react-router-dom";
import { IVerifyForgotPasswordRequestDto } from "../interfaces";
import { verifyForgotPasswordApi } from "../../api";

export const useVerifyForgotPassword = () => {
    const navigate = useNavigate()

    return useMutation<
        IApiResponse<boolean>,
        AxiosError<IApiErrorResponse>,
        IVerifyForgotPasswordRequestDto
    >({
        mutationFn: verifyForgotPasswordApi,
        mutationKey: ['verify-forgot-password'],
        onSuccess: (data, variables) => {
            toast.success('Код успішно підтверджено!')

            const route = ROUTES.RESET_PASSWORD.replace(
                ':code',
                variables.code
            ).replace(':email', variables.email);

            navigate(route)
        },
        onError: () => {
            toast.error('Не вдалося перевірити код. Спробуйте ще раз.');
        },
    });
};