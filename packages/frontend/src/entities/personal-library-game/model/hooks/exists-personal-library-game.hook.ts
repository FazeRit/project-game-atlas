import { useQuery } from "@tanstack/react-query"
import { IApiResponse } from "@/shared";
import { existsPersonalLibraryGameApi } from "../../api/exists-personal-library-game.api";

export const useExistsPersonalLibraryGame = (gameId: string) => {
    return useQuery<IApiResponse<boolean>>({
        queryKey: ['personal-library-game-exists', gameId], 
        queryFn: () => existsPersonalLibraryGameApi(gameId),
        enabled: !!gameId,
    });
}