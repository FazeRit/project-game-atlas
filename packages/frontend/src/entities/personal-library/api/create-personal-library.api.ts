import { IApiResponse } from "@/shared";
import { apiInstance } from "@/shared/api";
import { ICreatePersonalLibraryRequest } from "../model";

export const createPersonalLibraryApi = async (data: ICreatePersonalLibraryRequest): Promise<IApiResponse<void>> => {
    const response = await apiInstance.post<IApiResponse<void>>('/personal-libraries', data);

    return response.data;
}