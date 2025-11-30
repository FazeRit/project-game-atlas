import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { AxiosError } from "axios";
import { IApiResponse, IApiErrorResponse } from "@/shared";
import { createPersonalLibraryApi } from "../../api";
import { ICreatePersonalLibraryRequest } from "../interfaces";

export const useCreatePersonalLibrary = () => {
    return useMutation<
        IApiResponse<void>,
        AxiosError<IApiErrorResponse>,
        ICreatePersonalLibraryRequest
    >({
        mutationFn: createPersonalLibraryApi,
        mutationKey: ['create-personal-library'],
        onSuccess: () => {
            toast.success('Бібліотеку успішно створено');
        },
        onError: (error) => {
            toast.error('Не вдалося створити бібліотеку.');
        },
    });
};