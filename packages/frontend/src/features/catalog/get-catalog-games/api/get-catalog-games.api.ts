import { apiInstance } from "@/shared/api";
import { IApiPaginateResponseMeta, IApiResponse } from "@/shared";
import { IGetCatalogGamesRequestDto } from "../model";
import { IGame } from "@/entities/game";

export const getCatalogGamesApi = async (
    data: IGetCatalogGamesRequestDto
): Promise<IApiResponse<Array<IGame>, IApiPaginateResponseMeta>> => {
    const response = await apiInstance.get<IApiResponse<Array<IGame>, IApiPaginateResponseMeta>>('/games', {
        params: data
    });

    return response.data;
}