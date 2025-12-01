import { getPersonalLibraryGameDetailsApi } from "@/entities/personal-library-game/api";
import { useQuery } from "@tanstack/react-query";

export const useGetPersonalLibraryGame = (checksum: string) => {
	return useQuery({
		queryKey: ["personal-library-game", checksum],
		queryFn: () => getPersonalLibraryGameDetailsApi(checksum),
		enabled: !!checksum,
	});
};