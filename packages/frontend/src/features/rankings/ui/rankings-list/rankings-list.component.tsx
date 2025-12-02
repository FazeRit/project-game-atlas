import { useUpdatePersonalLibraryGame } from "@/entities";
import { EPersonalLibraryGameRank } from "@/entities/personal-library-game/model/enums";
import { useGetPersonalLibraryGames } from "@/features/personal-library";
import { useSensors, useSensor, PointerSensor, DndContext, closestCenter } from "@dnd-kit/core";
import { memo, useMemo, useState, useCallback } from "react";
import { rankOrder, TTiersState } from "../../model"; 
import { RankingsRow } from "../rankings-row";
import { groupGamesByRank } from "../../model/utils/group-games-by-rank.util";

export const RankingsList = memo(() => {
    const { data: personalLibraryGames, isLoading } = useGetPersonalLibraryGames({
        page: 1,
        limit: 100000,
        searchQuery: '',
        statuses: [],
        ranks: [],
    });

    const { mutateAsync: updateGameRank } = useUpdatePersonalLibraryGame();

    const computedInitialTiersState = useMemo(() => {
        return groupGamesByRank(personalLibraryGames?.data, rankOrder);
    }, [personalLibraryGames]);

    const [tiers, setTiers] = useState<TTiersState>(computedInitialTiersState);

    useMemo(() => {
        if (tiers !== computedInitialTiersState) {
            setTiers(computedInitialTiersState);
        }
    }, [computedInitialTiersState]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 }, 
        })
    );
    
    const handleUpdateRank = async (
        gameId: string,
        rank: EPersonalLibraryGameRank
    ) => {
        await updateGameRank({
            gameId,
            rank
        });
    }

    const findTierId = useCallback((itemId: string): EPersonalLibraryGameRank | undefined => {
        const tierKey = Object.keys(tiers).find((key) => 
            tiers[key as EPersonalLibraryGameRank].some(item => item.id === itemId)
        );
        return tierKey as EPersonalLibraryGameRank | undefined;
    }, [tiers]);

    const handleDragEnd = useCallback(async (event: any) => {
        const { active, over } = event;

        if (!over) return;

        const gameId = active.id as string;
        const overTierId = over.id as EPersonalLibraryGameRank;

        const activeTierId = findTierId(gameId);

        if (!activeTierId || activeTierId === overTierId) {
            return;
        }

        setTiers(prevTiers => {
            const itemToMove = prevTiers[activeTierId].find(item => item.id === gameId);

            if (!itemToMove) return prevTiers;

            const newActiveItems = prevTiers[activeTierId].filter(item => item.id !== gameId);
            const updatedItemToMove = { ...itemToMove, parent: overTierId };
            const newOverItems = [...prevTiers[overTierId], updatedItemToMove];

            return {
                ...prevTiers,
                [activeTierId]: newActiveItems,
                [overTierId]: newOverItems,
            };
        });

        await handleUpdateRank(gameId, overTierId);

    }, [findTierId, handleUpdateRank]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <p className="p-4 text-white text-lg text-center">Завантаження ігор...</p>
            </div>
        );
    }
    
    if (!personalLibraryGames?.data?.length) {
        return (
            <div className="flex justify-center items-center h-40">
                <p className="p-4 text-white text-lg text-center">
                    У вашій бібліотеці немає ігор.
                </p>
            </div>
        );
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div
                className="flex flex-col gap-2 bg-[#202020] shadow-2xl p-2 rounded-lg" 
            >
                {rankOrder.map((tierId) => {
                    const items = tiers[tierId] || [];
                    return (
                        <RankingsRow
                            key={tierId}
                            tierRank={tierId}
                            items={items}
                        />
                    );
                })}
            </div>
        </DndContext>
    );
});