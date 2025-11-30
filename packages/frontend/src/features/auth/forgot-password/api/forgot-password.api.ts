import { apiInstance } from "@/shared/api";
import { IApiResponse } from "@/shared";
import { IForgotPasswordRequestDto } from "../model";

export const forgotPasswordApi = async (data: IForgotPasswordRequestDto): Promise<IApiResponse<void>> => {
    const response = await apiInstance.post<IApiResponse<void>>('/auth/forgot-password', data);

    return response.data;
}