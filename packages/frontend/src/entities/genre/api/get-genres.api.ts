import { apiInstance } from "@/shared/api"
import { IGenreResponse } from "../model"
import { IApiResponse } from "@/shared";

export const getGenres = async (): Promise<IApiResponse<Array<IGenreResponse>>> => {
    const response = await apiInstance
    .get<IApiResponse<Array<IGenreResponse>>>('/genres');

    return response.data
}