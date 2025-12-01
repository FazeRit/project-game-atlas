import { IApiResponse } from "@/shared";
import { apiInstance } from "@/shared/api";

export const existsPersonalLibraryGameApi = async (gameId: string): Promise<IApiResponse<boolean>> => {
    const response = await apiInstance
        .get<IApiResponse<boolean>>(`/personal-library-games/exists`, {
            params: {
                gameId
            }
        });

    return response.data;
}