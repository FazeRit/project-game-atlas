import { apiInstance } from "@/shared/api";
import { IApiResponse } from "@/shared";
import { IJwtTokenResponse } from "@/entities/user/model/interfaces/jwt-response.interface";
import { IRegisterRequestDto } from "../model";

export const registerApi = async (data: IRegisterRequestDto): Promise<IApiResponse<IJwtTokenResponse>> => {
    const response = await apiInstance.post<IApiResponse<IJwtTokenResponse>>(
        '/auth/register', 
        data
    );

    return response.data; 
};