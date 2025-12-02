import { useQuery } from "@tanstack/react-query"
import { getRecommandationsApi } from "../../api/get-recommandations.api"

export const useGetRecommandations = () => {
    return useQuery({
        queryKey: ['recommandations'],
        queryFn: () => getRecommandationsApi()
    })    
}