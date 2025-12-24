import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { AxiosError } from "axios";
import { IApiResponse, IApiErrorResponse, ROUTES } from "@/shared";
import { forgotPasswordApi } from "../../api";
import { IForgotPasswordRequestDto } from "../interfaces/forgot-password-request.interface";
import { useNavigate } from "react-router-dom";

export const useForgotPassword = () => {
    const navigate = useNavigate()

    return useMutation<
        IApiResponse<void>,
        AxiosError<IApiErrorResponse>,
        IForgotPasswordRequestDto
    >({
        mutationFn: forgotPasswordApi,
        mutationKey: ['forgot-password'],
        onSuccess: (_, { email }) => {
            toast.success('Код підтвердження надіслано на вашу пошту')

            navigate(ROUTES.VERIFY_FORGOT_PASSWORD.replace(':email', email))
        },
        onError: () => {
            toast.error('Не вдалося надіслати запит відновлення.');
        },
    });
};