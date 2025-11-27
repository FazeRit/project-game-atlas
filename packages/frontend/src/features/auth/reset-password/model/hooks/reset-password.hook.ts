import { useMutation } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from "axios";
import { ROUTES, IApiResponse, IApiErrorResponse } from "@/shared";
import { resetPasswordApi } from "../../api";
import { IResetPasswordRequestDto } from "../interfaces/reset-password-request.interface";

export const useResetPassword = () => {
    const navigate = useNavigate();

    return useMutation<
        IApiResponse<void>, 
        AxiosError<IApiErrorResponse>, 
        IResetPasswordRequestDto
    >({
        mutationFn: resetPasswordApi,
        mutationKey: ['reset-password'],
        onSuccess: () => {
            toast.success('Пароль був успішно зміненний!');

            navigate(ROUTES.LOGIN);
        },
        onError: () => {
            toast.error('Не вдалося оновити пароль.');
        },
    });
};