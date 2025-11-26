import { apiInstance } from "@/shared/api";
import { ILoginRequestDto } from "../model/interfaces/login-request.interface"
import { IJwtTokenResponse } from "@/entities/user/model/interfaces/jwt-response.interface";
import { IApiResponse } from "@/shared";

export const loginApi = async (data: ILoginRequestDto): Promise<IApiResponse<IJwtTokenResponse>> => {
    const response = await apiInstance.post<IApiResponse<IJwtTokenResponse>>('/auth/login', data);

    return response.data; 
}