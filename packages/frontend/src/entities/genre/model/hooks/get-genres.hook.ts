import { useQuery } from "@tanstack/react-query"
import { IApiResponse } from "@/shared";
import { IGenreResponse } from "../interfaces";
import { getGenres } from "../../api";

export const useGetGenres = () => {
    return useQuery<IApiResponse<Array<IGenreResponse>>>({
        queryKey: ['genres'],
        queryFn: () => getGenres(),
    });
}