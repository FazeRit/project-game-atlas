import { apiInstance } from "@/shared/api";
import { IApiPaginateResponseMeta, IApiResponse } from "@/shared";
import { IPaginatePersonalLibraryGameResponse } from "@/entities/personal-library-game";
import { IGetPersonalLibraryGamesRequestDto } from "../model";
import qs from 'qs';

export const getPersonalLibraryGamesApi = async (
    data: IGetPersonalLibraryGamesRequestDto
): Promise<IApiResponse<Array<IPaginatePersonalLibraryGameResponse>, IApiPaginateResponseMeta>> => {
    const response = await apiInstance.get<IApiResponse<Array<IPaginatePersonalLibraryGameResponse>, IApiPaginateResponseMeta>>('/personal-library-games', {
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