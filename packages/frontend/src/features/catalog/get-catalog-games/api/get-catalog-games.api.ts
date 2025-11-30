import { apiInstance } from "@/shared/api";
import { IApiPaginateResponseMeta, IApiResponse } from "@/shared";
import { IGetCatalogGamesRequestDto } from "../model";
import { IPaginateGameResponse } from "@/entities/game";
import qs from 'qs';

export const getCatalogGamesApi = async (
    data: IGetCatalogGamesRequestDto
): Promise<IApiResponse<Array<IPaginateGameResponse>, IApiPaginateResponseMeta>> => {
    const response = await apiInstance.get<IApiResponse<Array<IPaginateGameResponse>, IApiPaginateResponseMeta>>('/games', {
        params: data,
        paramsSerializer: (params) => {
            return qs.stringify(params, {
                arrayFormat: 'repeat',
                skipNulls: true
            })
        }
    });

    return response.data;
}