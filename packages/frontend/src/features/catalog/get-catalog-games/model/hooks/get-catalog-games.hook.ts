import { useQuery } from "@tanstack/react-query";
import { getCatalogGamesApi } from "../../api";

import { IGetCatalogGamesRequestDto } from "../../model"; 
import { IApiPaginateResponseMeta, IApiResponse } from "@/shared";
import { IPaginateGameResponse } from "@/entities/game";

export const useGetCatalogGames = (data: IGetCatalogGamesRequestDto) => {
    return useQuery<IApiResponse<Array<IPaginateGameResponse>, IApiPaginateResponseMeta>, Error>({
        queryKey: ['catalog-games', data], 
        queryFn: () => getCatalogGamesApi(data),
        enabled: !!data
    })
};