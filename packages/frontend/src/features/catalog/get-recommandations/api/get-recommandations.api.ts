import { IApiResponse } from "@/shared";
import { apiInstance } from "@/shared/api"
import { IRecommandationsResponse } from "../model";

export const getRecommandationsApi = async (): Promise<IApiResponse<Array<IRecommandationsResponse>>> => {
    const response = await apiInstance.get<IApiResponse<Array<IRecommandationsResponse>>>('/analytics/recommandations')

    return response.data;
}