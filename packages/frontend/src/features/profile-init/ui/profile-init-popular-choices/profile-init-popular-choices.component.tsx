import { getCatalogGamesRequestSchema, IGetCatalogGamesRequestDto, useGetCatalogGames } from "@/features/catalog/get-catalog-games";
import { ECatalogGameSortField } from "@/features/catalog/get-catalog-games/model/enums";
import { ESortOrder } from "@/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ProfileInitItem } from "../profile-init-item";

export const ProfileInitPopularChoices = memo(() => {
    const methods = useForm({
        resolver: zodResolver(getCatalogGamesRequestSchema),
        defaultValues: {
            page: 1,
            limit: 6,
            keywords: [],
            genres: [],
            searchQuery: '',
            sort: `${ECatalogGameSortField.TOTAL_RATING_COUNT}:${ESortOrder.DESC}` as const 
        }
    });

    const methodsFormValues = methods.watch();

    const { data: games, isLoading } = useGetCatalogGames(methodsFormValues as IGetCatalogGamesRequestDto);

    if (isLoading || !games?.data?.length) {
        return null;
    }
    
    return (
        <FormProvider {...methods}>
            <div className="flex flex-col gap-4 w-full">
                <h2 className="text-[#A3A3A3] md:text-[14px] text-xs">
                    Популярні варіанти
                </h2>

                <div className="gap-2 md:gap-4 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(146px,1fr))]">
                    {games.data.map(item => (
                        <ProfileInitItem
                            key={item.checksum}
                            game={item}
                        />
                    ))}
                </div>
            </div>
        </FormProvider>
    )
});