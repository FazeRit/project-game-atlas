import { IApiResponse } from "@/shared";
import { IPersonalLibraryGameDetailsResponse } from "../model";
import { apiInstance } from "@/shared/api";

export const getPersonalLibraryGameDetailsApi = async (gameId: string): Promise<IApiResponse<IPersonalLibraryGameDetailsResponse | null>> => {
    const response = await apiInstance
        .get<IApiResponse<IPersonalLibraryGameDetailsResponse>>(`/personal-library-games/${gameId}`);

    return response.data;
}