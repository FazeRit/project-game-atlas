import { IApiResponse } from "@/shared";
import { IGameDetailsResponse } from "../model";
import { apiInstance } from "@/shared/api";

export const getGameDetails = async (checksum: string): Promise<IApiResponse<IGameDetailsResponse>> => {
    const response = await apiInstance
        .get<IApiResponse<IGameDetailsResponse>>(`games/${checksum}`);

    return response.data;
}