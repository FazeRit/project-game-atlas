import { apiInstance } from "@/shared/api"
import { IUserResponseDto } from "../model";

export const getUser = async (): Promise<IUserResponseDto> => {
    const response = await apiInstance
        .get<IUserResponseDto>('/users');

    return response.data;
}   