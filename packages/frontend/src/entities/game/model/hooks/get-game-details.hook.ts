import { useQuery } from "@tanstack/react-query"
import { IApiResponse } from "@/shared";
import { IGameDetailsResponse } from "../interfaces";
import { getGameDetails } from "../../api";

export const useGetGameDetails = (gameId: string) => {
    return useQuery<IApiResponse<IGameDetailsResponse>>({
        queryKey: ['game', gameId],
        queryFn: () => getGameDetails(gameId),
        enabled: !!gameId,
    });
}