import { apiInstance } from "@/shared/api";
import { IApiResponse } from "@/shared";
import { IResetPasswordRequestDto } from "../model/interfaces/reset-password-request.interface";

export const resetPasswordApi = async (data: IResetPasswordRequestDto): Promise<IApiResponse<void>> => {
    const response = await apiInstance.post<IApiResponse<void>>('/auth/reset-password', data);

    return response.data; 
}