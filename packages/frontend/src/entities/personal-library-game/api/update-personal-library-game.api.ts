import { IApiResponse } from "@/shared";
import { apiInstance } from "@/shared/api";
import { IUpdatePersonalLibraryGameRequest } from "../model/interfaces/update-personal-library-game.interface";

export const updatePersonalLibraryGameApi = async (data: IUpdatePersonalLibraryGameRequest): Promise<IApiResponse<void>> => {
    const response = await apiInstance.put<IApiResponse<void>>('/personal-library-games', data);

    return response.data;
}