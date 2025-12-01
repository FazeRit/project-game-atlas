import { useQuery } from "@tanstack/react-query";

import { IApiPaginateResponseMeta, IApiResponse } from "@/shared";
import { IPaginatePersonalLibraryGameResponse } from "@/entities/personal-library-game";
import { getPersonalLibraryGamesApi } from "../../api";
import { IGetPersonalLibraryGamesRequestDto } from "../interfaces";

export const useGetPersonalLibraryGames = (data: IGetPersonalLibraryGamesRequestDto) => {
    return useQuery<IApiResponse<Array<IPaginatePersonalLibraryGameResponse>, IApiPaginateResponseMeta>, Error>({
        queryKey: ['personal-library-games', data],
        queryFn: () => getPersonalLibraryGamesApi(data),
        enabled: !!data
    })
};