import { apiInstance } from "@/shared/api";
import { IApiResponse } from "@/shared";
import { IRegisterRequestDto } from "../model";

export const registerApi = async (data: IRegisterRequestDto): Promise<IApiResponse<null>> => {
    const response = await apiInstance.post<IApiResponse<null>>(
        '/auth/register', 
        data
    );

    return response.data; 
};