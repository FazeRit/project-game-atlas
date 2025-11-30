import { useQuery } from "@tanstack/react-query"
import { IApiResponse } from "@/shared";
import { IGameDetailsResponse } from "../interfaces";
import { getGameDetails } from "../../api";

export const useGetGameDetails = (checksum: string) => {
    return useQuery<IApiResponse<IGameDetailsResponse>>({
        queryKey: ['game', checksum],
        queryFn: () => getGameDetails(checksum),
        enabled: !!checksum,
    });
}