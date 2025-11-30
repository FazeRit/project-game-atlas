import { IApiResponse } from "@/shared";
import { ICreatePersonalLibraryGameRequest } from "../model/interfaces/create-personal-library-game.interface";
import { apiInstance } from "@/shared/api";

export const createPersonalLibraryGameApi = async (data: ICreatePersonalLibraryGameRequest): Promise<IApiResponse<void>> => {
    const response = await apiInstance.post<IApiResponse<void>>('/personal-library-games', data);

    return response.data;
}