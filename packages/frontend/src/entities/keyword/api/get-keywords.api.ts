import { apiInstance } from "@/shared/api"
import { IKeywordResponse } from "../model"
import { IApiPaginateResponseMeta, IApiResponse } from "@/shared";
import qs from 'qs';
import { IGetKeywordsRequestDto } from "../model/interfaces/get-keywords.interface";

export const getKeywords = async (
    data: IGetKeywordsRequestDto
): Promise<IApiResponse<Array<IKeywordResponse>, IApiPaginateResponseMeta>> => {
    const response = await apiInstance
    .get<IApiResponse<Array<IKeywordResponse>, IApiPaginateResponseMeta>>('/keywords', {
        params: data, 
        paramsSerializer: (params) => {
            return qs.stringify(params, {
                arrayFormat: 'repeat',
                skipNulls: true
            })
        }
    });

    return response.data
}