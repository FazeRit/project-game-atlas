import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { AxiosError } from "axios";
import { IApiResponse, IApiErrorResponse } from "@/shared";
import { createPersonalLibraryGameApi } from "../../api";
import { ICreatePersonalLibraryGameRequest } from "../interfaces";

export const useCreatePersonalLibraryGame = () => {
    const queryClient = useQueryClient();

    return useMutation<
        IApiResponse<void>,
        AxiosError<IApiErrorResponse>,
        ICreatePersonalLibraryGameRequest
    >({
        mutationFn: createPersonalLibraryGameApi,
        mutationKey: ['create-personal-library-game'],
        onSuccess: (_, variables) => {
            const { gameId } = variables;

            queryClient.invalidateQueries({ queryKey: ['personal-library-game-exists', gameId] });

            queryClient.invalidateQueries({ queryKey: ['game', gameId] }); 
            
            queryClient.invalidateQueries({ queryKey: ['personal-library-games'] });

            toast.success('Гру успішно додано до бібліотеки');
        },
        onError: () => {
            toast.error('Не вдалося додати гру до бібліотеки.');
        },
    });
};