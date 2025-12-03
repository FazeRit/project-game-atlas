import { apiInstance } from "@/shared/api";
import { ILoginRequestDto } from "../model/interfaces/login-request.interface"
import { IApiResponse } from "@/shared";

export const loginApi = async (data: ILoginRequestDto): Promise<IApiResponse<null>> => {
    const response = await apiInstance.post<IApiResponse<null>>('/auth/login', data);

    return response.data; 
}