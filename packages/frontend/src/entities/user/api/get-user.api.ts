import { apiInstance } from "@/shared/api"
import { IUser } from "../model";

export const getUser = async (): Promise<IUser> => {
    const response = await apiInstance
        .get<IUser>('/users');

    return response.data;
}   