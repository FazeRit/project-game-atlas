import { useQuery } from "@tanstack/react-query"
import { IApiPaginateResponseMeta, IApiResponse } from "@/shared";
import { IKeywordResponse } from "../interfaces";
import { getKeywords } from "../../api";
import { IGetKeywordsRequestDto } from "../interfaces/get-keywords.interface";

export const useGetKeywords = (data: IGetKeywordsRequestDto) => {
    return useQuery<IApiResponse<Array<IKeywordResponse>, IApiPaginateResponseMeta>, Error>({
        queryKey: ['keywords'],
        queryFn: () => getKeywords(data),
    });
}