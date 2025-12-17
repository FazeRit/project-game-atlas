import { memo, useMemo, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@uidotdev/usehooks";
import { getCatalogGamesRequestSchema, IGetCatalogGamesRequestDto, useGetCatalogGames } from "@/features/catalog/get-catalog-games";
import { ProfileInitFilters } from "../profile-init-filters";
import { profileInitListSchema, TProfileInitListSchema } from "../../model/schemas/profile-init-list.schema";
import { IPaginateGameResponse } from "@/entities/game";
import { ProfileInitPopularChoices } from "../profile-init-popular-choices";
import { ProfileInitItem } from "../profile-init-item";
import { ProfileInitGameItemEmpty } from "../profile-init-game-item-empty";
import { Button } from "@/shared/components";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared";
import { EPersonalLibraryGameStatus, EPersonalLibraryGameRank } from "@/entities/personal-library-game/model/enums";
import { useCreatePersonalLibraryGame } from "@/entities/personal-library-game";

export const ProfileInitList = memo(() => {
    const navigate = useNavigate();

    const catalogMethods = useForm({
        resolver: zodResolver(getCatalogGamesRequestSchema),
        defaultValues: {
            page: 1,
            limit: 50,
            keywords: [],
            genres: [],
            searchQuery: '',
        }
    });

    const profileInitMethods = useForm<TProfileInitListSchema>({
        resolver: zodResolver(profileInitListSchema),
        defaultValues: {
            games: []
        }
    });

    const catalogFormValues = catalogMethods.watch();
    const catalogDebouncedFormValues = useDebounce(catalogFormValues, 500);

    const { mutateAsync: createGame } = useCreatePersonalLibraryGame();

    const { data: games } = useGetCatalogGames(catalogDebouncedFormValues as IGetCatalogGamesRequestDto);

    const selectedGamesObjects = profileInitMethods.watch('games');

    const selectedGameIds = useMemo(() => {
        return selectedGamesObjects.map((g) => g.checksum);
    }, [selectedGamesObjects]);

    const handleSearchChange = useCallback((value: string) => {
        catalogMethods.setValue('searchQuery', value);
    }, [catalogMethods]);

    const handleGamesChange = useCallback((newIds: string[]) => {
        if (newIds.length > 5) return;

        const currentSelected = profileInitMethods.getValues('games');
        const currentCatalog = games?.data || [];

        const newSelectedObjects = newIds.map(checksumId => {
            const existing = currentSelected.find(g => g.checksum === checksumId);
            if (existing) return existing;

            const foundInCatalog = currentCatalog.find((g: IPaginateGameResponse) => g.checksum === checksumId);
            
            if (foundInCatalog) {
                return {
                    checksum: foundInCatalog.checksum,
                    name: foundInCatalog.name,
                    coverUrl: foundInCatalog.cover?.url || '', 
                };
            }

            return null;
        }).filter((item): item is TProfileInitListSchema['games'][0] => item !== null);

        profileInitMethods.setValue('games', newSelectedObjects, {
            shouldValidate: true,
            shouldDirty: true
        });
    }, [games, profileInitMethods]);

    const onSave = async (data: TProfileInitListSchema) => {
        await Promise.all(data.games.map(game => 
            createGame({
                gameId: game.checksum,
                status: EPersonalLibraryGameStatus.PREFERENCE,
                rank: EPersonalLibraryGameRank.UNRANKED
            })
        ));

        navigate(ROUTES.PERSONAL_LIBRARY);
    };

    const handleClear = useCallback(() => {
        profileInitMethods.setValue('games', []);
    }, [profileInitMethods]);

    const availableGames = useMemo(() => {
        return games?.data.map((game: IPaginateGameResponse) => ({
            value: game.checksum, 
            label: game.name,
        })) ?? [];
    }, [games]);

    const emptySlotsCount = Math.max(0, 5 - selectedGamesObjects.length);
    const emptySlots = Array.from({ length: emptySlotsCount });

    const { isSubmitting } = profileInitMethods.formState;

    return (
        <FormProvider {...catalogMethods}>
            <div className="flex flex-col gap-4 md:gap-8 mt-4 md:mt-8 w-full">
                <ProfileInitFilters
                    availableGames={availableGames}
                    selectedGames={selectedGameIds}
                    onGamesChange={handleGamesChange}
                    searchQuery={catalogFormValues.searchQuery ?? ''}
                    onSearchChange={handleSearchChange}
                />
                
                <div className="flex flex-row justify-between items-center">
                    <p className="text-[#A3A3A3] md:text-[14px] sm:text-xs">
                        Selected games: <span className="font-medium text-white">{selectedGamesObjects.length}</span>/5
                    </p>
                    <button 
                        type="button" 
                        onClick={handleClear}
                        className="text-zinc-400 md:text-[14px] hover:text-white text-sm hover:underline transition-colors"
                    >
                        Clear
                    </button>
                </div>

                <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                    {selectedGamesObjects.map((game) => {
                        return (
                            <div key={game.checksum} className="h-full">
                                <ProfileInitItem
                                    game={game} 
                                />
                            </div>
                        );
                    })}

                    {emptySlots.map((_, index) => (
                        <div key={`empty-${index}`} className="h-full min-h-[240px]">
                            <ProfileInitGameItemEmpty />
                        </div>
                    ))}
                </div>
                
                <ProfileInitPopularChoices />

                <Button
                    variant="blue"
                    type="button"
                    onClick={profileInitMethods.handleSubmit(onSave)}
                    disabled={isSubmitting}
                    className="self-center w-[260px]"
                >
                    {isSubmitting ? 'Saving...' : 'Зберегти'}          
                </Button>
                
                <Link
                    to={ROUTES.CATALOG}
                    className="self-center text-[#737373] md:text-[14px] text-xs"
                >
                    Пропустити    
                </Link>
            </div>
        </FormProvider>
    )
});