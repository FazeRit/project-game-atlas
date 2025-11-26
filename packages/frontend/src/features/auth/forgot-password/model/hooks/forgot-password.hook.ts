import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { AxiosError } from "axios";
import { IApiResponse, IApiErrorResponse } from "@/shared";
import { forgotPasswordApi } from "../../api";
import { IForgotPasswordRequestDto } from "../interfaces/forgot-password-request.interface";

export const useForgotPassword = () => {
    return useMutation<
        IApiResponse<void>,
        AxiosError<IApiErrorResponse>,
        IForgotPasswordRequestDto
    >({
        mutationFn: forgotPasswordApi,
        mutationKey: ['forgot-password'],
        onSuccess: () => {
            toast.success('OTP code was sent to your email')
        },
        onError: (error) => {
            const message = error.response?.data?.data?.message;

            if (Array.isArray(message)) {
                message.forEach(msg => toast.error(msg));
            } else if (typeof message === 'string') {
                toast.error(message);
            } else {
                toast.error('Forget password failed.');
            }
        },
    });
};