import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { AxiosError } from "axios";
import { IApiResponse, IApiErrorResponse } from "@/shared";
import { IUpdatePersonalLibraryGameRequest } from "../interfaces/update-personal-library-game.interface";
import { updatePersonalLibraryGameApi } from "../../api/update-personal-library-game.api";

export const useUpdatePersonalLibraryGame = () => {
    const queryClient = useQueryClient();

    return useMutation<
        IApiResponse<void>,
        AxiosError<IApiErrorResponse>,
        IUpdatePersonalLibraryGameRequest
    >({
        mutationFn: updatePersonalLibraryGameApi,
        mutationKey: ['update-personal-library-game'], 
        onSuccess: (_, variables) => {
            const { gameId } = variables;

            queryClient.invalidateQueries({ queryKey: ['personal-library-game-exists', gameId] });

            queryClient.invalidateQueries({ queryKey: ['personal-library-game', gameId] }); 
            
            queryClient.invalidateQueries({ queryKey: ['personal-library-games'] });

            toast.success('Статус гри в бібліотеці успішно оновлено!');
        },
        onError: () => {
            toast.error('Не вдалося оновити статус гри в бібліотеці.');
        },
    });
};