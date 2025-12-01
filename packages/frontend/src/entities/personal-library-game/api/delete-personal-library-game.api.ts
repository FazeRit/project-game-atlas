import { IApiResponse } from "@/shared";
import { apiInstance } from "@/shared/api";

export const deletePersonalLibraryGameApi = async (gameId: string): Promise<IApiResponse<void>> => {
    const response = await apiInstance.delete<IApiResponse<void>>(`/personal-library-games/${gameId}`);

    return response.data;
}