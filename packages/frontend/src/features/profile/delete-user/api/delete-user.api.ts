import { IApiResponse } from "@/shared";
import { apiInstance } from "@/shared/api";

export const deleteUserApi = async (): Promise<IApiResponse<null>> => {
    const response = await apiInstance
        .delete<IApiResponse<null>>('/users');

    return response.data;
}