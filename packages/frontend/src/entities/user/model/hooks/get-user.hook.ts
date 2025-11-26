import { useQuery } from "@tanstack/react-query"
import { getUser } from "../../api"
import { useUserStore } from "../store";
import { IUserResponseDto } from "../interfaces";

export const useGetUser = () => {
    const {
        isAuthenticated
    } = useUserStore();

    return useQuery<IUserResponseDto, Error>({
        queryKey: ['user'],
        queryFn: getUser,
        enabled: isAuthenticated,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
}