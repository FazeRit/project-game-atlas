import { IApiResponse } from "@/shared"
import { apiInstance } from "@/shared/api"
import { IGetCompatibilityResponse } from "../model";

export const getCompatibilityApi = async (gameId: string): Promise<IApiResponse<IGetCompatibilityResponse>> => {
    const response = await apiInstance.get<IApiResponse<IGetCompatibilityResponse>>(`/analytics/predict/${gameId}`)

    return response.data;
}