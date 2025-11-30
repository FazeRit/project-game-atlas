import { apiInstance } from "@/shared/api";
import { IApiResponse } from "@/shared";
import { IVerifyForgotPasswordRequestDto } from "../model";

export const verifyForgotPasswordApi = async (data: IVerifyForgotPasswordRequestDto): Promise<IApiResponse<boolean>> => {
    const response = await apiInstance.post<IApiResponse<boolean>>('/auth/verify-forgot-password', data);

    return response.data;
}