import { useQuery } from "@tanstack/react-query"
import { getCompatibilityApi } from "../../api/get-compatibility.api";

export const useGetCompatibility = (gameId: string) => {
    return useQuery({
        queryKey: ['compatibility', gameId],
        queryFn: () => getCompatibilityApi(gameId),
        enabled: !!gameId,
    });
}