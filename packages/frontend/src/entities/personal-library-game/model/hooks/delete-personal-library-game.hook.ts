import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { AxiosError } from "axios";
import { IApiResponse, IApiErrorResponse } from "@/shared";
import { deletePersonalLibraryGameApi } from "../../api"; 

export const useDeletePersonalLibraryGame = () => {
    const queryClient = useQueryClient();

    return useMutation<
        IApiResponse<void>,
        AxiosError<IApiErrorResponse>,
        string
    >({
        mutationFn: deletePersonalLibraryGameApi,
        mutationKey: ['delete-personal-library-game'],
        onSuccess: (_, gameId) => { 
            queryClient.invalidateQueries({ queryKey: ['personal-library-game-exists', gameId] });

            queryClient.invalidateQueries({ queryKey: ['game', gameId] }); 
            
            queryClient.invalidateQueries({ queryKey: ['personal-library-games'] });

            toast.success('Гру успішно видалено з бібліотеки');
        },
        onError: () => {
            toast.error('Не вдалося видалити гру з бібліотеки.');
        },
    });
};