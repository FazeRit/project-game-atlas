import { useQuery } from "@tanstack/react-query"
import { getUser } from "../../api"
import { useUserStore } from "../store";
import { IUserResponseDto } from "../dto/user-response.dto";
import { IApiResponse } from "@/shared";

export const useGetUser = () => {
    const {
        isAuthenticated
    } = useUserStore();

    return useQuery<IApiResponse<IUserResponseDto>>({
        queryKey: ['user'],
        queryFn: () => getUser(),
        enabled: isAuthenticated,
    });
}