import { apiInstance } from "@/shared/api"
import { IUser } from "../model";
import { IUserResponseDto } from "../model/dto/user-response.dto";
import { IApiResponse } from "@/shared";

export const getUser = async (): Promise<IApiResponse<IUserResponseDto>> => {
    const response = await apiInstance
        .get<IApiResponse<IUser>>('/users');

    return response.data;
}   