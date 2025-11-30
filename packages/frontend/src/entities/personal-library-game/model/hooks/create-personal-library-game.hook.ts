import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { AxiosError } from "axios";
import { IApiResponse, IApiErrorResponse } from "@/shared";
import { createPersonalLibraryGameApi } from "../../api";
import { ICreatePersonalLibraryGameRequest } from "../interfaces";

export const useCreatePersonalLibraryGame = () => {
    return useMutation<
        IApiResponse<void>,
        AxiosError<IApiErrorResponse>,
        ICreatePersonalLibraryGameRequest
    >({
        mutationFn: createPersonalLibraryGameApi,
        mutationKey: ['create-personal-library-game'],
        onSuccess: () => {
            toast.success('Гру успішно додано до бібліотеки');
        },
        onError: (error) => {
            toast.error('Не вдалося додати гру до бібліотеки.');
        },
    });
};