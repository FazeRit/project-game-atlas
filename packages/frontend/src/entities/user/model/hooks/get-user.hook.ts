import { useQuery } from "@tanstack/react-query"
import { getUser } from "../../api"
import { useUserStore } from "../store";
import { IUser } from "../interfaces";

export const useGetUser = () => {
    const {
        isAuthenticated
    } = useUserStore();

    return useQuery<IUser, Error>({
        queryKey: ['user'],
        queryFn: getUser,
        enabled: isAuthenticated,
    });
}